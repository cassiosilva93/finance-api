class HttpResponse {
  public statusCode: number;

  public body: unknown;

  constructor(statusCode: number, body: unknown) {
    this.statusCode = statusCode;
    this.body = body;
  }
}

export default HttpResponse;
