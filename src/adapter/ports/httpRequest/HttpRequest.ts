interface IFile {
  filename: string;
  originalname: string;
}

export interface IHttpRequest {
  body?: any;
  params?: string;
  query?: string;
  file?: IFile;
  headers?: {
    authorization?: string;
  };
}
