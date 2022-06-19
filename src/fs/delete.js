import { unlink } from 'fs/promises';
import { resolve } from 'path';
import { currentlyDirectory } from '../os/currentlyDirectory.js';

export const remove = async (pathToFile) => {
  try {
    pathToFile = resolve(pathToFile);
    await unlink(pathToFile);
    console.log('file was removed');
    currentlyDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
};
