export default interface Storage {
  saveFile(filename: string): Promise<boolean | Error>;
  deleteFile(filename: string): Promise<boolean>;
}
