import { Express } from 'express';
import bodyParser from 'body-parser';

export default (app: Express) => {
    app.use(bodyParser.json({ type: 'application/json' }));
};
