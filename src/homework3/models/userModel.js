import { Sequelize, DataTypes, Model } from 'sequelize';

class User extends Model {}

export default (sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.UUIDV4,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            login: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                field: 'is_deleted'
            }
        },
        {
            sequelize,
            modelName: 'user',
            timestamps: false
        }
    );
    return User;
};
