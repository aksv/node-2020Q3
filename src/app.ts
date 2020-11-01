import express, { Express } from 'express';

export default async function application() {
    const app: Express = express();
    await require('./loaders').default(app);
    return app;
}
