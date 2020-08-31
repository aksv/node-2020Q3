import { Op } from 'sequelize';

class UserRepository {
    constructor(userModel, userMapper) {
        this.userModel = userModel;
        this.userMapper = userMapper;
    }

    async createUser(userInfo) {
        const user = await this.userModel.create(userInfo);
        return this.userMapper.toDomain(user);
    }

    async updateUser(id, user) {
        const updated = await this.userModel.update(user, { where: { id } });
        if (updated[0] === 0) {
            return null;
        }
        // TODO: find out if sequelize allow return changed row on update
        return this.getUserById(id);
    }

    async deleteUser(id) {
        const isDeleted = await this.userModel.update({ isDeleted: true }, { where: { id } });
        return isDeleted[0] > 0;
    }

    async getUserById(id) {
        const users = await this.userModel.findAll({
            where: {
                id
            }
        });
        if (users.length === 0) {
            return null;
        }
        return this.userMapper.toDomain(users[0]);
    }

    async getAutoSuggest(loginSubstr, limit) {
        const users = await this.userModel.findAll({
            where: {
                login: {
                    [Op.like]: `%${loginSubstr}%`
                }
            },
            limit
        });
        return users.map(this.userMapper.toDomain);
    }
}

export default UserRepository;
