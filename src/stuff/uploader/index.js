import { promises as fsp, existsSync } from 'fs';
import {
  ADMIN_UPLOAD_FILE_LIMIT,
  ADMIN_UPLOAD_FILE_SUPPORTED_MIMETYPES
} from '../../../config/upload';

class UploadService {
  constructor() {}

  async uploadFile(req) {
    try {
      if (req.file.size > ADMIN_UPLOAD_FILE_LIMIT) {
        await this.destroyFile(req.file.path);
        return { status: 400, data: { message: 'File limit exceeded' } };
      }
      if (!ADMIN_UPLOAD_FILE_SUPPORTED_MIMETYPES.includes(req.file.mimetype)) {
        await this.destroyFile(req.file.path);
        return { status: 400, data: { message: 'Not supported mimetype' } };
      }
      if (!existsSync(`${process.cwd()}/public/${req.appid}`)) {
        await fsp.mkdir(`${process.cwd()}/public/${req.appid}`);
      }
      const newPath = req.file.filename + '.' + req.file.originalname.split('.').pop();
      await fsp.rename(req.file.path, `${process.cwd()}/public/${req.appid}/${newPath}`);
      return { status: 200, data: { file_path: newPath } };
    } catch (err) {
      await this.destroyFile(req.file.path);
      return { status: 400, data: { err } };
    }
  }

  async destroyFile(file) {
    return await fsp.unlink(file);
  }
}

export default new UploadService();
