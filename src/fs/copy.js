import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const copy = async () => {
  const error = new TypeError('FS operation failed');
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const mainPath = path.join(__dirname, 'files');
  const copyPath = path.join(__dirname, 'files_copy');

  try {
    await fs.stat(mainPath, (err) => {
      if (err) throw error;
    });
    await fs.mkdir(copyPath);
    const files = await fs.readdir(mainPath, { withFileTypes: true });
    files.forEach((file) => {
      fs.copyFile(path.join(mainPath, file.name), path.join(copyPath, file.name));
    });
    console.log('folder copied');
  } catch (err) {
    if (err) throw error;
  }
};

copy();
