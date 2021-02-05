const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pers', {
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
    fraction: {
      type: "ENUM('resident','arrived')",
      allowNull: false
    },
    id_clan: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    health: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    power: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    agility: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stamina: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cunning: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attention: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    charism: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    health0: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    power0: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    agility0: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stamina0: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cunning0: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attention0: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    charism0: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    health1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    power1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    agility1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stamina1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cunning1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attention1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    charism1: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pers',
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
