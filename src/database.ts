import {
  Connection,
  createConnection,
  ConnectionOptions,
} from 'typeorm';
import logger from './lib/logger';
import databaseConfig from '../config/database.json';
import entities from './entity';

export const getConnection = async (): Promise<Connection> => {

  const connectionOptions: ConnectionOptions = {
    type: 'mysql',
    database: databaseConfig.database,
    synchronize: databaseConfig.synchronize,
    logging: databaseConfig.logging,
    entities,
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.username,
    password: databaseConfig.password,
  };

  try {
    const connection = createConnection(connectionOptions);
    logger.green('[DB] connected');
    return connection;
  } catch (err) {
    logger.red('[DB] Connection Error', err.message);
  }
};
