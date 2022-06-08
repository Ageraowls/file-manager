import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const create = async () => {
  const error = new TypeError('FS operation failed');
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToFilesFolder = path.join(__dirname, 'files', 'fresh.txt');
  fs.stat(pathToFilesFolder, async (err) => {
    if (!err) throw error;
    else if (err.code === 'ENOENT') {
      fs.writeFile(pathToFilesFolder, 'I am fresh and young', () => {
        console.log('file created');
      });
    }
  });
};

create();
