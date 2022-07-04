import HttpResponse from './HttpResponse';

class Unauthorized extends HttpResponse {
  constructor() {
    super(401, {
      message: 'unauthorized user',
    });
  }
}

export default Unauthorized;
