import IStorageProvider from '../models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private diskStorage: string[] = [];

  public async saveFile(filename: string): Promise<void> {
    this.diskStorage.push(filename);
  }

  public async deleteFile(filename: string): Promise<void> {
    const fileIndex = this.diskStorage.findIndex(file => file === filename);

    this.diskStorage.splice(fileIndex, 1);
  }
}
