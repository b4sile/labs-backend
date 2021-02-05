var DataTypes = require('sequelize').DataTypes;
var _dep = require('./dep');
var _pers = require('./pers');
var _square = require('./square');
var _war_pers = require('./war_pers');
var _wars = require('./wars');
import { sequelize } from '../db';

function initModels(sequelize) {
  var dep = _dep(sequelize, DataTypes);
  var pers = _pers(sequelize, DataTypes);
  var square = _square(sequelize, DataTypes);
  var war_pers = _war_pers(sequelize, DataTypes);
  var wars = _wars(sequelize, DataTypes);

  return {
    dep,
    pers,
    square,
    war_pers,
    wars,
  };
}

// export const {
//   dep: Dep,
//   wars: Wars,
//   pers: Pers,
//   square: Square,
//   war_pers: War_pers,
// } = initModels(sequelize);

export const models = initModels(sequelize);

sequelize
  .sync()
  .then(() => console.log('sync success'))
  .catch((err) => console.log(err));
