import { Sequelize } from 'sequelize';
import userModel from './models/user.js';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'app.db'
});

export const User = userModel(sequelize);
