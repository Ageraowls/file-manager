import fs from 'fs/promises';
import { resolve } from 'path';

export const copy = async (pathToFile, pathToNewDirectory) => {
  try {
    pathToFile = resolve(pathToFile);
  } catch (error) {
    console.error('Operation failed');
  }
};
