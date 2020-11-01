import bcrypt from 'bcryptjs';

const SALT_HASH_KEY = 11;

export default async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_HASH_KEY);
}