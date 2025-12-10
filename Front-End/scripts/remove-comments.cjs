const fs = require('fs');
const path = require('path');
const stripComments = require('strip-comments');

const ROOT = path.resolve(__dirname, '..');
const EXTS = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.html']);

const languageByExt = {
  '.js': 'javascript',
  '.jsx': 'javascript',
  '.ts': 'typescript',
  '.tsx': 'typescript',
  '.css': 'css',
  '.html': 'html',
};

const shouldSkip = (filePath) => {
  const rel = path.relative(ROOT, filePath);
  if (rel.startsWith('node_modules')) return true;
  if (rel.startsWith('dist')) return true;
  if (rel.startsWith('.git')) return true;
  if (rel.includes('package-lock.json')) return true;
  if (rel.includes('.DS_Store')) return true;
  return false;
};

const collectFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (shouldSkip(entryPath)) continue;
    if (entry.isDirectory()) {
      files.push(...collectFiles(entryPath));
    } else if (EXTS.has(path.extname(entry.name))) {
      files.push(entryPath);
    }
  }
  return files;
};

const stripFileComments = (filePath) => {
  const original = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath);
  const language = languageByExt[ext] || 'javascript';
  let stripped;
  try {
    stripped = stripComments(original, { language });
  } catch (err) {
    console.warn(`Failed to strip comments from ${filePath}:`, err.message);
    return;
  }

  if (ext === '.jsx' || ext === '.tsx') {
    stripped = stripped.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
    stripped = stripped.replace(/\r?\n\s*\{\s*\}\s*\r?\n/g, '\n');
    stripped = stripped.replace(/\s*\{\s*\}\s*/g, '');
  }

  if (stripped !== original) {
    fs.writeFileSync(filePath, stripped, 'utf8');
    console.log(`Stripped comments from ${path.relative(ROOT, filePath)}`);
  }
};

const main = () => {
  const files = collectFiles(ROOT);
  files.forEach(stripFileComments);
};

main();
