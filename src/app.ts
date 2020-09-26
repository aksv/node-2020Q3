import express, { Express } from 'express';

import config from './config';

async function startServer() {
    const app: Express = express();

    await require('./loaders').default(app);
    const { port } = config;

    app.listen(port, () => {
        /* if (err) {
            console.log('Unable to start app: ', err);
            process.exit(1);
        } */
        console.log('\x1b[33m%s\x1b[0m',
            `Application listens on http://localhost:${port}`);
    });
}

startServer();
