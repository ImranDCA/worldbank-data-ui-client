import { currentHistory } from './applicationSetup';
import { wait } from './waitUtil';

export async function navigate(path: string) {
  currentHistory!.push(path);
  await wait(10)
}

