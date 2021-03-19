import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const ProductSku = sequelize.define(
  'ProductSku',
  {
    softSku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendorSku: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.STRING,
    },
    softLineProductFamily: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    version: {
      type: DataTypes.STRING,
    },
    language: {
      type: DataTypes.STRING,
    },
    media: {
      type: DataTypes.STRING,
    },
    versionType1: {
      type: DataTypes.STRING,
    },
    versionType2: {
      type: DataTypes.STRING,
    },
    licenseLevel: {
      type: DataTypes.STRING,
    },
    point: {
      type: DataTypes.STRING,
    },
    retail: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
