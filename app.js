import fs from 'fs';
import path, { dirname, resolve } from 'path';
import os from 'os';
import * as readline from 'node:readline';
import { homeDir } from './src/os/home_directory.js';
import { currentlyDirectory } from './src/os/currently_directory.js';
import { stdin, stdout, chdir, cwd } from 'process';
import { calculateHash } from './src/hash/hash.js';
import { remove } from './src/fs/delete.js';
import { create } from './src/fs/create.js';

const userInputArgs = process.argv.slice(2);
const userName = userInputArgs.map((arg) => {
  const result = arg.split('=').slice(1);
  return result.join('').replace('_', ' ');
});

console.log(`Welcome to the File Manager, ${userName}!`);
currentlyDirectory();

// prettier-ignore
const rl = readline.createInterface(
	{
		input: process.stdin,
		output: process.stdout
	}
);

rl.on('line', async (line) => {
  const command = line.split(' ')[0];
  const firstArg = line.split(' ')[1];
  const secondArg = line.split(' ')[2];

  switch (command) {
    case 'up':
      try {
        chdir('..');
        currentlyDirectory();
      } catch (err) {
        console.error('Operation failed');
        currentlyDirectory();
      }
      break;

    case 'ls':
      try {
        const curPath = resolve(cwd());
        const files = await fs.promises.readdir(curPath);
        console.table(files);
        currentlyDirectory();
      } catch (err) {
        console.error('Operation failed');
        currentlyDirectory();
      }
      break;

    case 'cd':
      try {
        chdir(firstArg);
        currentlyDirectory();
      } catch (err) {
        console.error('Operation failed: no such directory');
        currentlyDirectory();
      }
      break;

    case 'add':
      create(firstArg);
      break;

    case 'exit':
      process.exit();

    case 'hash':
      calculateHash(firstArg);
      break;

    case 'rm':
      remove(firstArg);
      break;

    default:
      console.log('Invalid input');
      currentlyDirectory();
      break;
  }
});

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${userName}`);
});

process.on('SIGINT', () => process.on('exit'));
