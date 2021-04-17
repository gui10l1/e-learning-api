export default interface IStorageProvider {
  saveFile(filename): Promise<void>;
  deleteFile(filename): Promise<void>;
}
