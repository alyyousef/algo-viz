import fs from 'fs/promises'
import path from 'path'

async function findScaffolded(dir, list = []) {
  if (list.length >= 10) return list;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (list.length >= 10) break;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await findScaffolded(fullPath, list);
    } else if (entry.name.endsWith('.mdx')) {
      const content = await fs.readFile(fullPath, 'utf8');
      if (content.includes('This page has been scaffolded')) {
        list.push(fullPath);
      }
    }
  }
  return list;
}

findScaffolded('src/features/kb/routes/KB').then(list => {
  list.forEach(p => console.log(p));
});
