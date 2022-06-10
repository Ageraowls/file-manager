import fs from 'fs';
import path, { dirname, resolve } from 'path';
import os from 'os';
import * as readline from 'node:readline';
import { showHomeDir } from './src/os/home_directory.js';
import { currentlyDirectory } from './src/os/currently_directory.js';
import { stdin, stdout, chdir, cwd } from 'process';
import { calculateHash } from './src/hash/hash.js';
import { remove } from './src/fs/delete.js';
import { create } from './src/fs/create.js';
import { read } from './src/fs/read.js';
import { showCpus } from './src/os/cpus.js';
import { showEol } from './src/os/eol.js';
import { showUserName } from './src/os/user_name.js';
import { showArchitecture } from './src/os/cp_architecture.js';
import { copy } from './src/fs/copy.js';

const userInputArgs = process.argv.slice(2);
const userName = userInputArgs.map((arg) => {
  const result = arg.split('=').slice(1);
  return result.join('').replace('_', ' ');
});

console.log(`Welcome to the File Manager, ${userName}!`);
// chdir(os.homedir());
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

    case 'read':
      read(firstArg);
      break;

    case 'add':
      create(firstArg);
      break;

    case 'exit':
      process.exit();

    case 'hash':
      calculateHash(firstArg);
      break;

    case 'os':
      if (firstArg === '--homedir') {
        showHomeDir();
      } else if (firstArg === '--cpus') {
        showCpus();
      } else if (firstArg === '--EOL') {
        showEol();
      } else if (firstArg === '--username') {
        showUserName();
      } else if (firstArg === '--architecture') {
        showArchitecture();
      }
      break;

    case 'rm':
      remove(firstArg);
      break;

    case 'cp':
      copy(firstArg, secondArg);
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
