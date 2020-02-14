import 'dotenv/config';
import app from './app';
// import * as database from './database';
import logger from './lib/logger'

const { PORT } = process.env;

// database.getConnection();

app.listen(PORT || 8080, () => {
  logger.green(`wlswoo-blog server is listening to ${PORT}`);
});
