import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_NAME_INF, DB_USER, DB_PASS, DB_HOSTNAME } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: 'mysql',
  host: DB_HOSTNAME,
});

export const infoDb = new Sequelize(DB_NAME_INF, DB_USER, DB_PASS, {
  dialect: 'mysql',
  host: DB_HOSTNAME,
});

export const databases = {
  [sequelize.getDatabaseName()]: sequelize,
  [infoDb.getDatabaseName()]: infoDb,
};
