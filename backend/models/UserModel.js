import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js';
import Patient from './patientModel.js';

const User = sequelize.define(
  'User',
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
  }
);

// Define the relationship
User.hasMany(Patient, { foreignKey: 'userId', as: 'patients' });
Patient.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default User;