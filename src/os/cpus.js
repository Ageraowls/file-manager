import os from 'os';
import { currentlyDirectory } from './currently_directory.js';

export const showCpus = () => {
  try {
    console.table(os.cpus());
    currentlyDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
};
