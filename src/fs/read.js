import { createReadStream } from 'fs';
import { finished } from 'stream';
import { resolve } from 'path';
import { currentlyDirectory } from '../os/currently_directory.js';

export const read = async (pathToFile) => {
  try {
    console.log(pathToFile, '1');
    pathToFile = resolve(pathToFile);
    console.log(pathToFile, '2');
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
