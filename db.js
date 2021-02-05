import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOSTNAME } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: 'mysql',
  host: DB_HOSTNAME,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
//   .finally(() => {
//     sequelize.close();
//   });
