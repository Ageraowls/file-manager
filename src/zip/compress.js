import { createReadStream, createWriteStream } from 'fs';
import { parse, resolve } from 'path';
import { stat } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';
import { currentlyDirectory } from '../os/currentlyDirectory.js';

async function isDirectory(path) {
  try {
    path = resolve(path);
    const stats = await stat(path);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}

async function isFile(path) {
  try {
    path = resolve(path);
    const stats = await stat(path);
    return stats.isFile();
  } catch (error) {
    return false;
  }
}

export default async function compress(pathToFile, pathToDestination) {
  try {
    const isNotDirectory = !(await isDirectory(pathToDestination));
    const isNotFile = !(await isFile(pathToFile));

    if (isNotDirectory) throw new Error("it's not a directory");
    if (isNotFile) throw new Error("it's not a file");

    pathToFile = resolve(pathToFile);
    const { base } = parse(pathToFile);
    const fileName = `${base}.br`;
    pathToDestination = resolve(pathToDestination, fileName);

    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(pathToDestination);
    const brotliCompress = createBrotliCompress();
    await pipeline(readableStream, brotliCompress, writableStream);
    currentlyDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
}
