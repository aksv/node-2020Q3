import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { Payload } from '../models';

export function createToken(payload: Payload, secret: Secret, options: SignOptions): string {
    return jwt.sign(payload, secret, options);
}

export function decodeToken(token: string, secret: Secret): object | string {
    try {
        return jwt.verify(token, secret);
    } catch (e) {
        return null;
    }
}
