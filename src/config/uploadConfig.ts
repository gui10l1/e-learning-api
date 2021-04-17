import multer from 'multer';
import path from 'path';

const tmpPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  fileFolder: tmpPath,
  storage: multer.diskStorage({
    destination: tmpPath,
    filename: (_, filename, callback) => {
      const fileNameHashed = `${new Date().getTime()}-${filename.originalname}`;

      return callback(null, fileNameHashed);
    },
  }),
};
