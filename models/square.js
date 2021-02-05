const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('square', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pers: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_clan: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    stat: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'square',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
