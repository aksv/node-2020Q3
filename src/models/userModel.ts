import { Sequelize, DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export interface User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export class UserModel extends Model<User> implements User {
    public id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
    public isDeleted: boolean;
}

export interface UserAutoSuggest {
    loginSubstr: string;
    limit: number;
}

export const loadUser = (sequelize: Sequelize) => {
    UserModel.init(
        {
            id: {
                type: DataTypes.UUIDV4,
                defaultValue: uuidv4(),
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
    return UserModel;
};
