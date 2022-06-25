import uploadConfig from '@src/config/upload';
import express from 'express';
import multer from 'multer';
import { FileController } from '../controllers/FileController';

const router = express.Router();
const upload = multer(uploadConfig.multer);

router.post('/file', upload.single('transactions'), FileController.save);

export default router;
