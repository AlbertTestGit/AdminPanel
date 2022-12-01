import { DataTypes } from 'sequelize';

export const petrelVersions = {
};

export default (sequelize) => {
    return sequelize.define('Plugin', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        developerKey: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // TODO: Доработать
        petrelVersion: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});
}
