import application from './app';


async function startServer() {
    const app = await application();

    app.listen(process.env.API_PORT, () => {
        console.log('\x1b[33m%s\x1b[0m',
            `Application listens on http://localhost:${process.env.API_PORT}`);
    });
}

startServer();


