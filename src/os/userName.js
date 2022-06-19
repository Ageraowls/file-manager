import os, { userInfo } from 'os';
import { currentlyDirectory } from './currentlyDirectory.js';

export const showUserName = () => {
  try {
    const { username } = userInfo();
    console.log(username);
    currentlyDirectory();
  } catch (error) {
    console.error('Operation failed');
  }
};
