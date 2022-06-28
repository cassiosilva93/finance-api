import { Request, Response } from 'express';
import HttpAdapter from './ports/Http';

export default class Express implements HttpAdapter {
  create(fn: Function) {
    const func = async (request: Request, response: Response) => {
      const obj = await fn(request, response);
      response.json(obj);
    };
    return func;
  }
}
