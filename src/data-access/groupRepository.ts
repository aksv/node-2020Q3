import { GroupModel, Group } from '../models';

class GroupRepository {
    groupMapper: any;

    constructor(groupMapper: any) {
        this.groupMapper = groupMapper;
    }

    async createGroup(groupInfo: Group): Promise<Group> {
        const group = await GroupModel.create(groupInfo);
        return this.groupMapper.toDomain(group);
    }

    async getGroups(): Promise<Array<Group>> {
        const groups = await GroupModel.findAll();
        return groups.map(this.groupMapper.toDomain);
    }

    async getGroupById(id: string): Promise<Group> {
        const group = await GroupModel.findByPk(id);
        if (group === null) {
            return null;
        }
        return this.groupMapper.toDomain(group);
    }

    async updateGroup(id: string, group: Group): Promise<Group> {
        const updated = await GroupModel.update(group, { where: { id }, returning: true });
        if (updated[0] === 0) {
            return null;
        }
        return this.groupMapper.toDomain(updated[1][0]);
    }

    async deleteGroup(id: string): Promise<number> {
        return GroupModel.destroy({ where: { id }});
    }
}

export default GroupRepository;