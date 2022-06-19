import { cwd } from 'process';

export const currentlyDirectory = () => {
  console.info(`You are currently in ${cwd()}`);
};
