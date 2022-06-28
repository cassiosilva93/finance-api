import HttpResponse from './HttpResponse';

export default class BadRequest extends HttpResponse {
  constructor(message: string) {
    super(400, {
      message,
    });
  }
}
