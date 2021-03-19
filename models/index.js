import { Images } from './Image';
import { Parser } from './Parser';
import { License } from './License';
import { ProductSku } from './ProductSku';
import { ProductFamily } from './ProductFamily';
import { Questionnaries } from './Questionnaires';
import { sequelize, infoDb } from '../db';

function initModels(sequelize) {
  return {
    Images,
    Parser,
    Questionnaries,
    ProductSku,
    ProductFamily,
    License,
  };
}

ProductFamily.hasMany(ProductSku);
ProductFamily.belongsTo(License);
License.hasMany(ProductFamily);

export const models = initModels(sequelize);

sequelize
  .sync()
  .then(() => infoDb.sync())
  .then(() => console.log('sync success'))
  .catch((err) => console.log(err));
