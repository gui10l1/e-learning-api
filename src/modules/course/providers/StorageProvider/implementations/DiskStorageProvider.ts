import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/uploadConfig';

import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(filename: string): Promise<void> {
    path.resolve(uploadConfig.fileFolder, filename);
  }

  public async deleteFile(filename: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.fileFolder, filename);

    try {
      fs.promises.stat(filePath);
    } catch {
      return;
    }

    fs.promises.unlink(filePath);
  }
}
