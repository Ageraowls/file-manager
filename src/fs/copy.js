import { createReadStream, createWriteStream } from 'fs';
import { resolve, parse } from 'path';
import { pipeline } from 'stream/promises';
import { currentlyDirectory } from '../os/currentlyDirectory.js';

export const copy = async (pathToFile, pathToNewDirectory) => {
  try {
    pathToFile = resolve(pathToFile);
    const { base } = parse(pathToFile);
    pathToNewDirectory = resolve(pathToNewDirectory, base);
    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(pathToNewDirectory);
    await pipeline(readableStream, writableStream);
    currentlyDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
};
