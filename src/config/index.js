import winstonConfig from './winstonConfig';

export default {
    databaseUrl:
        'postgres://postgres:somepassword@localhost:54320/db_users',
    api: {
        prefix: '/api/v1.0'
    },
    port: 3000,
    jwt: {
        secret: '@PPS3CR3Ta$fg&=0zxdvha',
        tokenExpirationTime: 300,
        refreshTokenExpirationTime: 86400
    }
};

export { winstonConfig };
