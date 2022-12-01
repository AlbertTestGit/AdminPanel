import * as dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import userModel from './models/user.js';
import { pluginModel, pluginVersionModel } from './models/plugin.js'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SQLITE_STORAGE
});

export const User = userModel(sequelize);
export const Plugin = pluginModel(sequelize);
export const PluginVersion = pluginVersionModel(sequelize);

Plugin.hasOne(PluginVersion);
PluginVersion.belongsTo(Plugin);
