class UserMapper {
    toDomain(entity) {
        const { dataValues } = entity;
        const { id, login, password, age, isDeleted } = dataValues;
        return { id, login, password, age, isDeleted };
    }

    toDalEntity(domain) {
        return domain;
    }
}

export default UserMapper;
