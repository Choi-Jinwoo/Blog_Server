import 'dotenv/config';
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import api from './api';
import path from 'path';
import denyUnAllowed from './lib/middleware/denyUnAllowed';

const app = express();

app.use(denyUnAllowed);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api);
app.use('/static', express.static(path.join(__dirname, '../public')));

export default app;
