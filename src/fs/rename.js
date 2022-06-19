import fs from 'fs/promises';
import { resolve, parse } from 'path';
import { currentlyDirectory } from '../os/currentlyDirectory.js';

export const renameFile = async (pathToFile, newFilename) => {
  try {
    pathToFile = resolve(pathToFile);
    const { dir } = parse(pathToFile);
    const pathFromFile = resolve(dir, newFilename);
    await fs.rename(pathToFile, pathFromFile);
    currentlyDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
};
