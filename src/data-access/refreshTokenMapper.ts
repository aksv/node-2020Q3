import { RefreshToken } from '../models';

class RefreshTokenMapper {
    toDomain(entity): RefreshToken {
        const { dataValues } = entity;
        const { userId, token } = dataValues;
        return { userId, token };
    }

    toDalEntity(domain: RefreshToken) {
        return domain;
    }
}

export default RefreshTokenMapper;