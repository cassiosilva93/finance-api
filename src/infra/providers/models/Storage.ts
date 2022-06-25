export default interface Storage {
  saveFile(filename: string): Promise<string>;
  deleteFile(filename: string): Promise<void>;
}
