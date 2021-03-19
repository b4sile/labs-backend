import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const License = sequelize.define(
  'License',
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);
