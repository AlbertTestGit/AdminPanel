import { Sequelize } from 'sequelize';
import userModel from './models/user.js';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SQLITE_STORAGE
});

export const User = userModel(sequelize);
