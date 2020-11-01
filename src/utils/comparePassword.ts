import bcrypt from 'bcryptjs';

export default async function comparePassword(
    password: string,
    dbPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, dbPassword);
}
