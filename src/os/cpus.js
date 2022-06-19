import os from 'os';
import { currentlyDirectory } from './currentlyDirectory.js';

export const showCpus = () => {
  try {
    console.table(os.cpus());
    currentlyDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
};
