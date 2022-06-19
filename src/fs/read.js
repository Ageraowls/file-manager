import { createReadStream } from 'fs';
import { finished } from 'stream';
import { resolve } from 'path';
import { currentlyDirectory } from '../os/currentlyDirectory.js';

export const read = async (pathToFile) => {
  try {
    pathToFile = resolve(pathToFile);
    const readableStream = createReadStream(pathToFile, { encoding: 'utf8' });
    readableStream.pipe(process.stdout);
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
