const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'dep',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      top: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clan: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      id_pers: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fraction: {
        type: "ENUM('resident','arrived')",
        allowNull: false,
      },
      war: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ipoints: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'dep',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    }
  );
};
