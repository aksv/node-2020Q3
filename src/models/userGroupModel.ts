import { Sequelize, DataTypes, Model } from 'sequelize';

import { GroupModel } from './groupModel';
import { UserModel } from './userModel';

export interface UserGroup {
    groupId: string;
    userId: string;
}

export class UserGroupModel extends Model implements UserGroup {
    public groupId!: string;
    public userId!: string;
}

export const loadUserGroups = (sequelize: Sequelize) => {
    UserGroupModel.init(
        {
            groupId: {
                type: DataTypes.UUIDV4,
                references: {
                    model: 'group',
                    key: 'id'
                },
                field: 'group_id'
            },
            userId: {
                type: DataTypes.UUIDV4,
                references: {
                    model: 'user',
                    key: 'id'
                },
                field: 'user_id'
            }
        },
        {
            tableName: 'user_groups',
            timestamps: false,
            sequelize
        }
    );
    GroupModel.belongsToMany(UserModel, { through: UserGroupModel });
    UserModel.belongsToMany(GroupModel, { through: UserGroupModel });
};
