import { User, UserInfo, Group, GroupModel } from '../models';
import GroupMapper from './groupMapper';
class UserMapper {
    //TODO: inject
    private groupMapper: GroupMapper = new GroupMapper();

    toDomain(entity): User {
        const { dataValues } = entity;
        const { id, login, password, age, isDeleted } = dataValues;
        return { id, login, password, age, isDeleted };
    }

    toDalEntity(domain: User) {
        return domain;
    }

    toFullUserInfo(entity): UserInfo {
        const domain = this.toDomain(entity);
        if (entity.groups.length > 0) {
            const groups: Array<Group> = entity.groups.map(this.groupMapper.toDomain);
            return { ...domain, groups };
        }
        return { ...domain, groups: [] };
    }
}

export default UserMapper;
