import { Application } from 'express-serve-static-core';
import bodyParser from 'body-parser';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import cors from 'cors';
import { User } from '../../data/models/user';
import rateLimiter, { extraRateLimit } from '../modules/rate-limiter';
import multer from 'multer';
import { extname, resolve } from 'path';  
import crypto from 'crypto';
import { promisify } from 'util';
import { readFile, rename } from 'fs';
import validateUser from '../middleware/validate-user';
import updateUser from '../middleware/update-user';

const renameAsync = promisify(rename); 
const readFileAsync = promisify(readFile); 

function setupMulter(app: Application) {
  const uploadDir = resolve('./assets/upload');
  console.log('uploadDir:', uploadDir);
  
  // uses storage rather than memory - 2 file operations per file upload
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      log.info('multer -> ds -> destination', file);
      log.info('destination:', uploadDir);

      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      log.info('multer -> ds -> filename', file);
      log.info('prenamed file name:', Date.now() + extname(file.originalname));      
      
      cb(null, Date.now() + extname(file.originalname));
    }
  });
  const upload = multer({ storage });

  // TODO: validate is logged in, etc.
  app.post('/v2/upload', updateUser, validateUser, extraRateLimit(10), upload.single('file'), async (req, res) => {
    const file = req.file!;

    console.log(file);    
  
    const buffer = await readFileAsync(file.path);
    const hash = crypto
      .createHash('md5')
      .update(buffer)
      .digest('hex'); 

    const newFileName = hash + extname(file.originalname);
    await renameAsync(file.path, `${uploadDir}/${newFileName}`);
    log.silly(`Uploaded ${newFileName}`);
    
    const url = `/upload/${newFileName}`;
    res.status(201).json({ hash, url });
  });
}
function setupPassport(app: Application) {
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (User as any).authenticate(),
  ));
  passport.serializeUser((User as any).serializeUser());
  passport.deserializeUser((User as any).deserializeUser());
}

export default (app: Application) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(rateLimiter);

  setupPassport(app);
  setupMulter(app);
}