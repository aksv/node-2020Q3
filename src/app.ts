import express, { Express } from 'express';
import dotenv from 'dotenv';

export default async function application() {
    dotenv.config();
    const app: Express = express();
    await require('./loaders').default(app);
    return app;
}
