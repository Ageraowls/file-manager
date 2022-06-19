import { createReadStream, createWriteStream } from 'fs';
import { unlink, stat } from 'fs/promises';
import { parse, resolve } from 'path';
import { pipeline } from 'stream/promises';
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

export default async function move(pathToFile, pathToNewDirectory) {
  try {
    const isNotDirectory = !(await isDirectory(pathToNewDirectory));

    if (isNotDirectory) throw new Error('invalid path_to_new_directory');

    pathToFile = resolve(pathToFile);
    const { base } = parse(pathToFile);
    pathToNewDirectory = resolve(pathToNewDirectory, base);
    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(pathToNewDirectory);
    await pipeline(readableStream, writableStream);
    await unlink(pathToFile);
    currentlyDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
}
