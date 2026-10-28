import { readFile, writeFile, mkdir, rename, access, constants } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IMAGES_TS = path.resolve("src/components/images.ts");
const PUBLIC_DIR = path.resolve("public");
const TARGET_ASPECT = 4 / 3;
const TARGET_WIDTH = 1600;
const TARGET_HEIGHT = 1200;
const CONCURRENCY = 6;
const TIMEOUT_MS = 45000;
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
};

const slugify = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const fileExists = async (p) => {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const parseEntries = (source) => {
  const entries = [];
  let entry = null;
  for (const line of source.split("\n")) {
    let match;
    if ((match = line.match(/^\s*id:\s*(\d+)\s*,/))) {
      entry = { id: Number(match[1]) };
      continue;
    }
    if (!entry) continue;
    if ((match = line.match(/^\s*city1:\s*"(.+)"\s*,?\s*$/))) {
      entry.city1 = match[1];
      continue;
    }
    if ((match = line.match(/^\s*city2:\s*"(.+)"\s*,?\s*$/))) {
      entry.city2 = match[1];
      continue;
    }
    if ((match = line.match(/^\s*country1:\s*"(.+)"\s*,?\s*$/))) {
      entry.country1 = match[1];
      continue;
    }
    if ((match = line.match(/^\s*country2:\s*"(.+)"\s*,?\s*$/))) {
      entry.country2 = match[1];
      continue;
    }
    if ((match = line.match(/^\s*img1:\s*"(.+)"\s*,?\s*$/))) {
      entry.img1 = match[1];
      continue;
    }
    if ((match = line.match(/^\s*img2:\s*"(.+)"\s*,?\s*$/))) {
      entry.img2 = match[1];
      continue;
    }
    if ((match = line.match(/^\s*category:\s*"(.+)"\s*,?\s*$/))) {
      entry.category = match[1];
      if (entry.img1 && entry.img2) {
        entries.push(entry);
      }
      entry = null;
      continue;
    }
  }
  return entries;
};

const download = async (url) => {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: HEADERS,
        redirect: "follow",
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.byteLength < 1024) {
        throw new Error(`suspiciously small response (${buffer.byteLength} bytes)`);
      }
      return buffer;
    } catch (error) {
      if (attempt === 2) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }
  throw new Error("unreachable");
};

const dimensionsOf = async (buffer) => {
  const meta = await sharp(buffer, { failOn: "none" }).metadata();
  const swap = (meta.orientation || 1) >= 5;
  const width = swap ? meta.height : meta.width;
  const height = swap ? meta.width : meta.height;
  if (!width || !height) throw new Error("could not read dimensions");
  return { width, height };
};

const processImage = async (buffer, outPath) => {
  const { width, height } = await dimensionsOf(buffer);
  let cropWidth = width;
  let cropHeight = height;
  if (width / height > TARGET_ASPECT) {
    cropWidth = Math.round(height * TARGET_ASPECT);
  } else if (width / height < TARGET_ASPECT) {
    cropHeight = Math.round(width / TARGET_ASPECT);
  }
  const left = Math.floor((width - cropWidth) / 2);
  const top = Math.floor((height - cropHeight) / 2);
  await sharp(buffer, { failOn: "none" })
    .rotate()
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .resize(TARGET_WIDTH, TARGET_HEIGHT)
    .webp({ quality: 82 })
    .toFile(outPath);
  return { source: `${width}x${height}` };
};

const run = async () => {
  const source = await readFile(IMAGES_TS, "utf8");
  const entries = parseEntries(source);
  if (entries.length === 0) {
    throw new Error("no entries found in images.ts");
  }

  const bufferCache = new Map();
  const results = [];
  const tasks = [];

  for (const entry of entries) {
    for (const side of [1, 2]) {
      const url = side === 1 ? entry.img1 : entry.img2;

      // Remove query parameters from the URL before extracting the base filename
      const urlWithoutQueryParams = url.split("?")[0];
      const baseFilename = path.parse(urlWithoutQueryParams).name;

      if (!baseFilename) {
        throw new Error(`Invalid image URL for entry ${entry.id} (side ${side}): "${url}" does not contain a recognizable filename.`);
      }

      // Construct the new target relative path using the category and the extracted base filename
      const targetRel = `/images/${slugify(entry.category)}/${baseFilename}.webp`;
      tasks.push({
        id: entry.id,
        side,
        url,
        targetRel,
        targetAbs: path.join(PUBLIC_DIR, targetRel),
      });
    }
  }

  const worker = async (task) => {
    const { id, side, url, targetRel, targetAbs } = task;
    if (await fileExists(targetAbs)) {
      results.push({ id, side, url, targetRel, status: "skipped" });
      return;
    }
    try {
      await mkdir(path.dirname(targetAbs), { recursive: true });
      if (url.startsWith("/images/")) {
        const sourceAbs = path.join(PUBLIC_DIR, url);
        if (!(await fileExists(sourceAbs))) {
          throw new Error(`local source ${url} not found`);
        }
        const buffer = await readFile(sourceAbs);
        const { width, height } = await dimensionsOf(buffer);
        if (width === TARGET_WIDTH && height === TARGET_HEIGHT) {
          await rename(sourceAbs, targetAbs);
          results.push({ id, side, url, targetRel, status: "moved" });
          return;
        }
        await processImage(buffer, targetAbs);
        results.push({ id, side, url, targetRel, status: "ok", source: `${width}x${height}` });
      } else {
        let buffer = bufferCache.get(url);
        if (!buffer) {
          buffer = await download(url);
          bufferCache.set(url, buffer);
        }
        await processImage(buffer, targetAbs);
        const { width, height } = await dimensionsOf(buffer);
        results.push({ id, side, url, targetRel, status: "ok", source: `${width}x${height}` });
      }
    } catch (error) {
      results.push({
        id,
        side,
        url,
        targetRel,
        status: "failed",
        error: error.message,
      });
    }
  };

  const queue = [...tasks];
  const runners = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length > 0) {
      const task = queue.shift();
      await worker(task);
    }
  });
  await Promise.all(runners);

  results.sort((a, b) => a.id - b.id || a.side - b.side);

  let updated = source;
  for (const result of results) {
    if (result.status === "failed") continue;
    updated = updated.split(`"${result.url}"`).join(`"${result.targetRel}"`);
  }
  if (updated !== source) {
    await writeFile(IMAGES_TS, updated, "utf8");
  }

  const failed = results.filter((r) => r.status === "failed");
  const upscaled = results.filter(
    (r) => r.status === "ok" && r.source && parseInt(r.source) < TARGET_WIDTH
  );

  for (const r of results) {
    const label =
      r.status === "failed" ? "FAIL" : r.status === "skipped" ? "SKIP" : " OK ";
    const note =
      r.status === "ok" ? `${r.source} -> ${TARGET_WIDTH}x${TARGET_HEIGHT}` : "-";
    console.log(`  [${label}] id ${r.id} img${r.side}: ${note} ${r.targetRel}`);
  }

  console.log(
    `\n${results.length - failed.length}/${results.length} images at ${TARGET_WIDTH}x${TARGET_HEIGHT} (4:3) webp`
  );
  if (failed.length > 0) {
    console.log(`\nKept original URL for ${failed.length} failures:`);
    for (const r of failed) {
      console.log(`  id ${r.id} img${r.side}: ${r.url}\n    -> ${r.error}`);
    }
  }
  if (upscaled.length > 0) {
    console.log(
      `\nUpscaled from low-res sources (no real detail added, may look soft):`
    );
    for (const r of upscaled) {
      console.log(`  id ${r.id} img${r.side}: ${r.source} -> ${TARGET_WIDTH}x${TARGET_HEIGHT}`);
    }
  }

  const referenced = [...updated.matchAll(/"(\/images\/[^"]+)"/g)].map((m) => m[1]);
  const missingOnDisk = referenced.filter(
    (ref) => !existsSync(path.join(PUBLIC_DIR, ref))
  );
  if (missingOnDisk.length > 0) {
    console.log(`\nWARNING: images.ts references files missing on disk:`);
    for (const ref of missingOnDisk) {
      console.log(`  ${ref}`);
    }
  }
  console.log(
    `\nimages.ts updated: ${updated !== source ? "yes" : "no (nothing changed)"}`
  );
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
