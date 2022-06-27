export default interface Storage {
  saveFile(filename: string): Promise<void>;
  deleteFile(filename: string): Promise<void>;
}
