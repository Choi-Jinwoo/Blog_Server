import 'dotenv/config';
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import api from './api';
import session from 'express-session';
import passport from './lib/passport';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET }))
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', api);

export default app;
