import express from 'express';
import bodyParser from 'body-parser';

import userRouter from './routes/user';
import validationErrorHandler from './validators/handler';

const app = express();
app.use(bodyParser.json({ type: 'application/json' }));

app.use('/api/v1.0/users', userRouter);
app.use(validationErrorHandler);

const port = 3000;


app.listen(port, () => {
    console.log('\x1b[33m%s\x1b[0m', 'Application listen on http://localhost:3000');
});
