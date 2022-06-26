import { Router } from 'express';
import fileRouter from './file';

const routes = Router();

routes.use('/file', fileRouter);

export default routes;
