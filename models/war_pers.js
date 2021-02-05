const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('war_pers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pers: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    id_war: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    negative_points: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'war_pers',
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
      {
        name: "id",
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
