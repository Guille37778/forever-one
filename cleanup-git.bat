@echo off
"C:\Program Files\Git\bin\git.exe" rm -r --cached .wrangler .vercel .netlify
"C:\Program Files\Git\bin\git.exe" commit -m "Limpieza profunda de archivos locales para Cloudflare"
"C:\Program Files\Git\bin\git.exe" push origin desarrollo-v2
