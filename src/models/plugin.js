import { DataTypes } from 'sequelize';

export const pluginVersionModel = (sequelize) => {
    return sequelize.define('PluginVersion', {
        version: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pluginFileURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        helpFilesURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gitRepository: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});
}

export const pluginModel = (sequelize) => {
    return sequelize.define('Plugin', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        developerKey: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        petrelVersion: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});
}
