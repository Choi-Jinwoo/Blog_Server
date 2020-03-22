import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import app from './app';
import * as database from './database';
import logger from './lib/logger'

const { PORT } = process.env;

database.getConnection();

// const option = {
//   ca: fs.readFileSync('/etc/letsencrypt/live/api.wlswoo.com/fullchain.pem'),
//   key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/api.wlswoo.com/privkey.pem'), 'utf8').toString(),
//   cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/api.wlswoo.com/cert.pem'), 'utf8').toString(),
// };

// https.createServer(option, app).listen(443, () => {
//   logger.green(`[HTTPS] wlswoo-blog server is listening to ${PORT}`);
// });

http.createServer(app).listen(PORT || 8080, () => {
  logger.green(`[HTTP] wlswoo-blog server is listening to ${PORT}`);
});
