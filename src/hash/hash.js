import fs from 'fs';
import { resolve } from 'path';
import crypto from 'crypto';
import { currentlyDirectory } from '../os/currentlyDirectory.js';
import { finished } from 'stream';

export const calculateHash = async (pathToFile) => {
  try {
    pathToFile = resolve(pathToFile);
    const hash = crypto.createHash('sha256');
    const readableStream = fs.createReadStream(pathToFile);
    readableStream.pipe(hash).setEncoding('hex').pipe(process.stdout);
    finished(readableStream, (error) => {
      if (error) {
        console.error('Operation Failed');
      } else {
        process.stdout.write('\n');
        currentlyDirectory();
      }
    });
  } catch (error) {
    console.error('Operation failed');
  }
};
