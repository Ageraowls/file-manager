import os from 'os';
import { currentlyDirectory } from './currentlyDirectory.js';

export const showArchitecture = () => {
  try {
    console.log(os.arch());
    currentlyDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
};
