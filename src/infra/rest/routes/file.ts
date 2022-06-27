import ExpressAdapter from '@src/adapter/Express';
import uploadConfig from '@src/config/upload';
import express from 'express';
import multer from 'multer';
import FileController from '../controllers/File';

const router = express.Router();
const upload = multer(uploadConfig.multer);

router.post(
  '/',
  upload.single('transactions'),
  ExpressAdapter.create(FileController.handle),
);

export default router;
