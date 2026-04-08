import fs from 'fs';
import path from 'path';

const wranglerPath = path.join('dist', 'server', 'wrangler.json');

if (fs.existsSync(wranglerPath)) {
  const config = JSON.parse(fs.readFileSync(wranglerPath, 'utf8'));
  
  if (config.assets || config.kv_namespaces) {
    console.log('Cleaning wrangler.json for Cloudflare Pages Compatibility...');
    delete config.assets;
    delete config.kv_namespaces;
    fs.writeFileSync(wranglerPath, JSON.stringify(config, null, 2));
    console.log('Fix applied successfully.');
  } else {
    console.log('No "assets" binding found in wrangler.json. Skipping fix.');
  }
} else {
  console.log('wrangler.json not found at', wranglerPath);
}
