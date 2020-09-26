import { UserModel, User } from '../models';
class UserMapper {
    toDomain(entity): User {
        const { dataValues } = entity;
        const { id, login, password, age, isDeleted } = dataValues;
        return { id, login, password, age, isDeleted };
    }

    toDalEntity(domain: User) {
        return domain;
    }
}

export default UserMapper;
