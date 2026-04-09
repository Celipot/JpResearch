import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Add with { type: "json" } to JSON imports (Node.js 20+)
  content = content.replace(
    /from\s+['"](\.[^'"]*?\.json)['"](?=\s*[;,\)])/g,
    (match, importPath) => {
      return `from '${importPath}' with { type: "json" }`;
    }
  );

  // Add .js extension to relative imports (but not to node_modules or JSON imports)
  // Match: from './path' or from "../path"
  // But NOT: from './path.json' (already has extension) or from 'package-name' (external)
  content = content.replace(
    /from\s+['"](\.[^'"]*?)(?<!\.json)(?<!\.js)['"](?=\s*[;,\)])/g,
    (match, importPath) => {
      return `from '${importPath}.js'`;
    }
  );

  fs.writeFileSync(filePath, content, 'utf-8');
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.js')) {
      fixImportsInFile(fullPath);
    }
  }
}

console.log('Fixing ESM imports...');
processDirectory(distDir);
console.log('Done!');
