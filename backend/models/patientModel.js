import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js';

const Patient = sequelize.define(
  'Patient',
  {
    medicalRecordNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    complaint: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    medicalHistory: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    bloodGroup: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    familyName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
  }
);

export default Patient;
