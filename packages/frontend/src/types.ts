import type { Image } from 'mdast';

export type UploadImagesHandler = (
  files: File[]
) => Promise<Pick<Image, 'url' | 'alt' | 'title'>[]>;
