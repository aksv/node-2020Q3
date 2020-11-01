import { Sequelize } from 'sequelize';
import { RefreshToken, RefreshTokenModel } from '../models';
import RefreshTokenMapper from './refreshTokenMapper';

export default class RefreshTokenRepository {
    private refreshTokenMapper: RefreshTokenMapper;

    constructor(refreshTokenMapper: RefreshTokenMapper) {
        this.refreshTokenMapper = refreshTokenMapper;
    }

    upsertRefreshToken(refreshToken: RefreshToken) {
        RefreshTokenModel.upsert(refreshToken);
    }

    async findUserRefreshToken(userId: string, token: string): Promise<RefreshToken> {
        const tokenFound: RefreshTokenModel = await RefreshTokenModel.findOne({
            where: {
                userId,
                token,
            }
        });
        if (!tokenFound) {
            return null;
        }
        return this.refreshTokenMapper.toDomain(tokenFound);
    }
}