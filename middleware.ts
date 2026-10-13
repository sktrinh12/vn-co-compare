import { geolocation, next } from "@vercel/functions";

const SPANISH_COUNTRIES = new Set([
  "AR",
  "BO",
  "CL",
  "CO",
  "CR",
  "CU",
  "DO",
  "EC",
  "ES",
  "GT",
  "HN",
  "MX",
  "NI",
  "PA",
  "PE",
  "PR",
  "PY",
  "SV",
  "UY",
  "VE",
]);

export const config = {
  matcher: ["/", "/about"],
};

export default function middleware(request: Request) {
  const { country } = geolocation(request);
  const lang =
    country === "VN"
      ? "vi"
      : SPANISH_COUNTRIES.has(country ?? "")
        ? "es"
        : "en";
  return next({
    headers: {
      "set-cookie": `vn-co-geo-language=${lang}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`,
    },
  });
}
