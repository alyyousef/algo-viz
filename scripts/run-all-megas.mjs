import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

async function main() {
  const scriptsDir = path.resolve('c:/Users/yinya/algo-viz/scripts');
  const files = await fs.readdir(scriptsDir);
  const megaScripts = files.filter(f => f.startsWith('generate-mega') && f.endsWith('.mjs'));
  
  // Sort naturally: mega1, mega2... mega10...
  megaScripts.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0');
    const numB = parseInt(b.match(/\d+/)?.[0] || '0');
    return numA - numB;
  });

  console.log(`Found ${megaScripts.length} mega scripts.`);

  let runCount = 0;

  for (const script of megaScripts) {
    const scriptPath = path.join(scriptsDir, script);
    const content = await fs.readFile(scriptPath, 'utf8');
    
    // Find all target files in the script (handles both single and double quotes)
    const regex = /["'](src\/features\/kb\/routes\/KB\/[^"']+)["']/g;
    let match;
    let shouldRun = false;
    
    while ((match = regex.exec(content)) !== null) {
      const targetFile = path.resolve('c:/Users/yinya/algo-viz', match[1]);
      try {
        const targetContent = await fs.readFile(targetFile, 'utf8');
        if (targetContent.includes('This page has been scaffolded') || targetContent.trim() === '') {
          shouldRun = true;
          break;
        }
      } catch (e) {
        if (e.code === 'ENOENT') {
          shouldRun = true;
          break;
        }
      }
    }

    if (shouldRun) {
      console.log(`Running ${script}...`);
      try {
        execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
        runCount++;
      } catch (err) {
        console.error(`Failed to run ${script}:`, err.message);
      }
    }
  }

  console.log(`Finished running ${runCount} scripts.`);
}

main().catch(console.error);
