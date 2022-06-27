import { Request, Response } from 'express';

export default class Express {
  static create(fn: Function) {
    return async function (req: Request, res: Response) {
      const obj = await fn(req.file);
      res.json(obj);
    };
  }
}
