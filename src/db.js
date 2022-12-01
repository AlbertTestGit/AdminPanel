import { Sequelize } from 'sequelize';
import userModel from './models/user.js';
import pluginModel from './models/plugin.js'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SQLITE_STORAGE
});

export const User = userModel(sequelize);
export const Plugin = pluginModel(sequelize);
