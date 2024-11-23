import multer from 'multer';
import type { FileFilterCallback } from "multer";
import { AppError } from '../../../utils/AppError';

const multerFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Only image files are allowed!', 400));
  }
};

const multerStorage = multer.memoryStorage();

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
