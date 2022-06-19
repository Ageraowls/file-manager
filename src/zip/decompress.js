import { createReadStream, createWriteStream } from 'fs';
import { parse, resolve } from 'path';
import { stat } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'zlib';
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

export default async function decompress(pathToFile, pathToDestination) {
  try {
    const isNotDirectory = !(await isDirectory(pathToDestination));
    const isNotFile = !(await isFile(pathToFile));

    if (isNotDirectory) throw new Error("it's not a directory");
    if (isNotFile) throw new Error("it's not a file");

    pathToFile = resolve(pathToFile);
    const { name, ext } = parse(pathToFile);

    if (!ext.includes('.br')) throw new Error('invalid file extension');

    pathToDestination = resolve(pathToDestination, name);

    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(pathToDestination);
    const brotliDecompress = createBrotliDecompress();
    await pipeline(readableStream, brotliDecompress, writableStream);
    currentlyDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
}
