import { UserRepository, RefreshTokenRepository } from '../data-access';
import { User, AuthInfo, AuthConfig, SignInInfo, Token } from '../models';
import { comparePassword, createToken, decodeToken } from '../utils';

class AuthService {
    private userRepository: UserRepository;
    private refreshTokenRepository: RefreshTokenRepository;
    private authConfig: AuthConfig;

    constructor(
        userRepository: UserRepository,
        refreshTokenRepository: RefreshTokenRepository,
        authConfig: AuthConfig,
    ) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.authConfig = authConfig;
    }

    private makeTokens(userId: string): Token {
        const token: string = createToken(
            { id: userId },
            this.authConfig.secret,
            { expiresIn: this.authConfig.tokenExpirationTime }
        );
        const refreshToken: string = createToken(
            { id: userId },
            this.authConfig.secret,
            { expiresIn: this.authConfig.refreshTokenExpirationTime }
        );
        this.refreshTokenRepository.upsertRefreshToken({
            userId,
            token: refreshToken,
        });
        return {
            accessToken: token,
            refreshToken,
        };
    }

    async signIn({ login, password }: SignInInfo): Promise<AuthInfo> {
        const user: User = await this.userRepository.getUserByLogin(login);
        if (!user) {
            return { authStatus: 'USER_NOT_FOUND' };
        }
        const passwordMatch: boolean = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return { authStatus: 'INVALID_PASSWORD' };
        }
        const token = this.makeTokens(user.id);
        return {
            authStatus: 'SUCCESS',
            token
        };
    }

    async refresh(refreshToken: string): Promise<AuthInfo> {
        const decoded: any = decodeToken(refreshToken, this.authConfig.secret);
        if (!decoded) {
            return {
                authStatus: 'INVALID_REFRESH_TOKEN'
            };
        }
        const userToken = await this.refreshTokenRepository.findUserRefreshToken(decoded.id, refreshToken);
        if (!userToken) {
            return {
                authStatus: 'INVALID_REFRESH_TOKEN'
            };
        }
        const token = this.makeTokens(decoded.id);
        return {
            authStatus: 'SUCCESS',
            token
        };
    }

    checkToken = token => {
        return decodeToken(token, this.authConfig.secret) !== null;
    }
}

export default AuthService;
