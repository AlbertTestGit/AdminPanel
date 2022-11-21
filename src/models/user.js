import { DataTypes } from 'sequelize';

export const roles = {
    SubsoilUser: 'Недропользователь',
    DesignInstitute: 'Проектный институт',
    ProjectAuthor: 'Автор проекта',
    ExpertGeologist: 'Эксперт геолог',
    ExpertDeveloper: 'Эксперт разработчик',
    Operator: 'Оператор',
    Administrator: 'Администратор'
};

export default (sequelize) => {
    return sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        licenseNumber: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: roles.SubsoilUser,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
}
