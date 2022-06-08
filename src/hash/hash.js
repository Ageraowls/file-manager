import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

export const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  fs.readFile(path.join(__dirname, 'files', 'fileToCalculateHashFor.txt'), (err, data) => {
    if (err) throw err;
    const str = data.toString();
    const hash = crypto.createHash('sha256').update(str).digest('hex');
    console.log(`\nhash: ${hash}\n`);
  });
};

calculateHash();
