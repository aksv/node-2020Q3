import { Sequelize, DataTypes, Model } from 'sequelize';

export interface Token {
    accessToken: string;
    refreshToken: string;
}

export interface Payload {
    id: string;
}

export interface RefreshToken {
    userId: string;
    token: string;
}

export class RefreshTokenModel extends Model implements RefreshToken {
    public userId!: string;
    public token!: string;
}

export const loadRefreshToken = (sequelize: Sequelize) => {
    RefreshTokenModel.init(
        {
            userId: {
                type: DataTypes.UUIDV4,
                primaryKey: true,
                field: 'user_id'
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'refreshToken',
            tableName: 'refresh_token',
            timestamps: false
        }
    );
};