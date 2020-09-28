import { Sequelize, DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface Group {
    id: string;
    name: string;
    permissions: Array<Permission>;
};

export class GroupModel extends Model implements Group {
    public id!: string;
    public name!: string
    public permissions!: Array<Permission>
}

export const loadGroup = (sequelize: Sequelize) => {
    GroupModel.init(
        {
            id: {
                type: DataTypes.UUIDV4,
                defaultValue: uuidv4(),
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            permissions: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'group',
            timestamps: false
        }
    );
    return GroupModel;
};
