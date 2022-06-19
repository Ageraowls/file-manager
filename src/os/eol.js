import os from 'os';
import { currentlyDirectory } from './currentlyDirectory.js';

export const showEol = () => {
  try {
    console.log(JSON.stringify(os.EOL));
    currentlyDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
};
