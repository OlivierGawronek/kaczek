const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const nextDir = path.join(outDir, '_next');
const assetsDir = path.join(outDir, 'assets');

if (fs.existsSync(nextDir)) {
  fs.renameSync(nextDir, assetsDir);
}

fs.readdirSync(outDir).forEach(file => {
  if (file.startsWith('_')) {
    const filePath = path.join(outDir, file);
    if (fs.statSync(filePath).isDirectory()) {
      fs.rmSync(filePath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(filePath);
    }
  }
});

function replaceInFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      replaceInFiles(filePath);
    } else if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/\/_next\//g, '/assets/');
      content = content.replace(/_next\//g, 'assets/');
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
}

replaceInFiles(outDir);