import { Controller, Post, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Controller('upload')
export class UploadController {
  constructor() {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  }

  @UseGuards(JwtAuthGuard)
  @Post('product-image')
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = uuidv4() + extname(file.originalname);
          cb(null, name);
        },
      }),
    }),
  )
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return files.map((f) => ({ url: `/uploads/${f.filename}` }));
  }
}
