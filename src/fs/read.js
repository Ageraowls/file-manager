import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const read = async () => {
  const error = new TypeError('FS operation failed');
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  fs.readFile(path.resolve(__dirname, './files', 'fileToRead.txt'), (err, data) => {
    if (err) throw error;
    console.log(data.toString());
  });
};

read();
