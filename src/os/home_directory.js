import os from 'os';
import { currentlyDirectory } from './currently_directory.js';

export const showHomeDir = () => {
  try {
    console.log(os.homedir());
    currentlyDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
};
