class HttpResponse {
  constructor(readonly statusCode: number, readonly body: unknown) {}
}

export default HttpResponse;
