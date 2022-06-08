import fs from 'fs';
import zlib from 'zlib';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const mainPath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const readStream = fs.createReadStream(mainPath);
  const writeStream = fs.createWriteStream(path.join(__dirname, 'files', 'fileToCompress.txt.gz'));
  const compressStream = zlib.createGzip();

  readStream.pipe(compressStream).pipe(writeStream);
  writeStream.on('finish', () => console.log('file was compressed'));
};

compress();
