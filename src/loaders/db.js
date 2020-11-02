import { Sequelize } from 'sequelize';

export default async () => {
    const sequelize = new Sequelize(process.env.DATABASE_URL);
    // TODO: handle errors
    await sequelize.authenticate();
    return sequelize;
};
