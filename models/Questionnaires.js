import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const Questionnaries = sequelize.define('Questionnaries', {
  post: {
    type: DataTypes.STRING,
  },
  fullname: {
    type: DataTypes.STRING,
  },
  birthday: {
    type: DataTypes.STRING,
  },
  education: {
    type: DataTypes.STRING,
  },
  languages: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  personal: {
    type: DataTypes.TEXT,
  },
  salary: {
    type: DataTypes.STRING,
  },
  file: {
    type: DataTypes.STRING,
  },
});
