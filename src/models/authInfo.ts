import { Token } from './tokenModel';

export type AuthStatus =
    'USER_NOT_FOUND' | 'INVALID_PASSWORD' | 'INVALID_REFRESH_TOKEN' | 'SUCCESS';

export interface AuthInfo {
    authStatus: AuthStatus;
    token?: Token;
}

export interface AuthConfig {
    secret: string;
    tokenExpirationTime: number;
    refreshTokenExpirationTime: number;
}

export interface SignInInfo {
    login: string;
    password: string;
}