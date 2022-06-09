import fs from 'fs/promises';
import { cwd } from 'process';
import path, { resolve } from 'path';
import { currentlyDirectory } from '../os/currently_directory.js';

export const create = async (fileName) => {
  try {
    const pathToFile = resolve(cwd(), fileName);
    await (await fs.open(pathToFile, 'a')).close();
    console.log(`${fileName} was created`);
    currentlyDirectory();
  } catch (error) {
    console.error('Operation failed', error);
  }
};
