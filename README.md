# vn-co-compare

- push to vercel for making public
```sh
rm -rf node_modules package-lock.json
npm install
vercel build
vercel deploy
```

- in order to convert images:
```bash
node scripts/normalize-images.mjs
```

- To verify after deploying:

```bash
curl -I https://vn-co-compare.vercel.app
```

- should show, and clearing localStorage will re-trigger geo detection.

```
set-cookie: vn-co-geo-language=...,
```
