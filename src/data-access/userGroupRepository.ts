import { Sequelize } from 'sequelize';
import { UserGroup, UserGroupModel } from '../models';

export default class UserGroupRepository {
    private sequelize: Sequelize;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
    }
    async addUsersToGroup(groupId: string, userIds: Array<string>): Promise<Array<UserGroup>> {
        const transaction = await this.sequelize.transaction();
        try {
            const userGroups: Array<UserGroup> = userIds.map(id => ({
                groupId,
                userId: id
            }))
            const created: Array<UserGroup> =
                await UserGroupModel.bulkCreate(userGroups);
            await transaction.commit();
            return created;
        } catch (err) {
            transaction.rollback();
            throw err;
        }
    }
}