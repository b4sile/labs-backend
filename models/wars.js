const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wars', {
    id_war: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_clan1: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    id_clan2: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    name_clan1: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    name_clan2: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    ipoint1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ipoint2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fight1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fight2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_winner: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    tugr: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ruda: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    oil: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'wars',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_war" },
        ]
      },
      {
        name: "id_war",
        using: "BTREE",
        fields: [
          { name: "id_war" },
        ]
      },
    ]
  });
};
