import { Op } from 'sequelize';

import { UserModel, User, UserInfo, UserAutoSuggest, GroupModel } from '../models';

class UserRepository {
    userMapper: any;

    constructor(userMapper: any) {
        this.userMapper = userMapper;
    }

    async createUser(userInfo: User) {
        const user = await UserModel.create(userInfo);
        return this.userMapper.toDomain(user);
    }

    async updateUser(id: string, user: User) {
        const updated = await UserModel.update(user, { where: { id } });
        if (updated[0] === 0) {
            return null;
        }
        // TODO: find out if sequelize allow return changed row on update
        return this.getUserById(id);
    }

    async deleteUser(id: string) {
        const isDeleted = await UserModel.update({ isDeleted: true }, { where: { id } });
        return isDeleted[0] > 0;
    }

    async getUserById(id: string): Promise<UserInfo> {
        const user = await UserModel.findOne({
            where: {
                id
            },
            include: {
                model: GroupModel,
                through: { attributes: [] }
            }
        });
        if (!user) {
            return null;
        }
        return this.userMapper.toFullUserInfo(user);
    }

    async getAutoSuggest(suggest: UserAutoSuggest): Promise<Array<User>> {
        const users = await UserModel.findAll({
            where: {
                login: {
                    [Op.like]: `%${suggest.loginSubstr}%`
                },
                isDeleted: false,
            },
            limit: suggest.limit
        });
        return users.map(this.userMapper.toDomain);
    }

    async getUserByLogin(login: string): Promise<User> {
        const user = await UserModel.findOne({
            where: {
                login
            }
        });
        if (!user) {
            return null;
        }
        return this.userMapper.toDomain(user);
    }
}

export default UserRepository;
