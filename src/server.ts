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

http.createServer(app).listen(PORT || 8080, () => {
  logger.green(`[HTTP] wlswoo-blog server is listening to ${PORT}`);
});
