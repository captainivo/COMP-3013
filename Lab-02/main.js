// I observed how this process was done in industry and based my lab on that example

import { writeFile, appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { argv } from 'node:process';
import { distance } from './mathHelpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'dataPoints');
const location = path.join(dataDir, 'points.txt');

async function main() {
  try {
    await mkdir(dataDir, { recursive: true });

    const argvContent = argv.join('\n') + '\n';
    await writeFile(location, argvContent, 'utf8');
    console.log('Contents saved.');

    const a = Number(argv[2]);
    const b = Number(argv[3]);
    const c = Number(argv[4]);
    const d = Number(argv[5]);

    if ([a, b, c, d].some(Number.isNaN)) {
      console.error('Please pass four numeric arguments: a b c d');
      process.exitCode = 1;
      return;
    }

    const line = `The distance between your two points: (${a}, ${b}), (${c}, ${d}) is ${distance(a, b, c, d)}\n`;
    await appendFile(location, line, 'utf8');
    console.log('The "data to append" was appended to file!');
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exitCode = 1;
  }
}

main();
