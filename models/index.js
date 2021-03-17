import { Images } from './Image';
import { Parser } from './Parser';
import { Questionnaries } from './Questionnaires';
import { sequelize, infoDb } from '../db';

function initModels(sequelize) {
  return {
    Images,
    Parser,
    Questionnaries,
  };
}

export const models = initModels(sequelize);

sequelize
  .sync()
  .then(() => infoDb.sync())
  .then(() => console.log('sync success'))
  .catch((err) => console.log(err));
