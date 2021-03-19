import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const ProductFamily = sequelize.define(
  'ProductFamily',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    os: {
      type: DataTypes.STRING,
    },
    licenseComment: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
