interface IFile {
  filename: string;
}

export interface IHttpRequest {
  body?: any;
  params?: string;
  query?: string;
  file?: IFile;
}
