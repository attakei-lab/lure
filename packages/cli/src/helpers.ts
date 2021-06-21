import { isAbsolute, resolve } from 'path';

export const absolute = (path: string): string => {
  return isAbsolute(path) ? path : resolve(path);
};
