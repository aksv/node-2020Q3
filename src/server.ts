import application from './app';
import config from './config';


async function startServer() {
    const { port } = config;
    const app = await application();

    app.listen(port, () => {
        console.log('\x1b[33m%s\x1b[0m',
            `Application listens on http://localhost:${port}`);
    });
}

startServer();


