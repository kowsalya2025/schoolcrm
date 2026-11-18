const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const inRoot = fs.existsSync('app') && fs.existsSync(path.join('app', 'package.json'));
const appDir = inRoot ? path.join(__dirname, 'app') : __dirname;

console.log('--- Vercel Build Script ---');
console.log('Current working directory:', process.cwd());
console.log('Building Expo Web in:', appDir);

execSync('npx expo export -p web', { cwd: appDir, stdio: 'inherit' });

if (inRoot) {
  const src = path.join(appDir, 'dist');
  const dest = path.join(__dirname, 'dist');
  console.log(`Copying build output from ${src} to ${dest}...`);
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

console.log('--- Vercel Build Complete ---');
