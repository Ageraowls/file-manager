import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const rename = async () => {
  const error = new TypeError('FS operation failed');
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const mainFileName = path.join(__dirname, 'files', 'wrongFilename.txt');

  fs.rename(mainFileName, path.join(__dirname, 'files', 'properFilename.md'), (err) => {
    if (err) throw error;
    console.log('file was renamed');
  });
};

rename();
