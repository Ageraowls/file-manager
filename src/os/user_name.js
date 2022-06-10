import os, { userInfo } from 'os';
import { currentlyDirectory } from './currently_directory.js';

export const showUserName = () => {
  try {
    const { username } = userInfo();
    console.log(username);
    currentlyDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
};
