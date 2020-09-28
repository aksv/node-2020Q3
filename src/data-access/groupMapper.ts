import { Group } from '../models';

class GroupMapper {
    toDomain(entity): Group {
        const { dataValues } = entity;
        const { id, name, permissions } = dataValues;
        return { id, name, permissions };
    }

    toDalEntity(domain: Group) {
        return domain;
    }
}

export default GroupMapper;