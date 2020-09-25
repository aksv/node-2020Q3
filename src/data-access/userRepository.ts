import { Op } from 'sequelize';

import { UserModel, User, UserAutoSuggest } from '../models';

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

    async getUserById(id: string) {
        const users = await UserModel.findAll({
            where: {
                id
            }
        });
        if (users.length === 0) {
            return null;
        }
        return this.userMapper.toDomain(users[0]);
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
}

export default UserRepository;
