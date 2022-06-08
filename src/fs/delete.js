import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const remove = async () => {
  const error = new TypeError('FS operation failed');
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const delFile = path.join(__dirname, 'files', 'fileToRemove.txt');

  fs.unlink(delFile, (err) => {
    if (err) throw error;
    console.log('file was removed');
  });
};

remove();
