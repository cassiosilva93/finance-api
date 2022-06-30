import { Request, Response } from 'express';
import HttpFrameworkAdapter from '../../adapter/ports/HttpFramework';

export default class Express implements HttpFrameworkAdapter {
  create(fn: Function) {
    const func = async (request: Request, response: Response) => {
      const obj = await fn(request, response);
      response.json(obj);
    };
    return func;
  }
}
