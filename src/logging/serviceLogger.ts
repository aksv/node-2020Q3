import { Express, Request, Response } from 'express';
import morgan, { TokenIndexer } from 'morgan';

import { methodArguments } from '../utils';

function logger(
    tokens: TokenIndexer<Request, Response>,
    req: Request,
    res: Response
): string | undefined | null {
    return [
        tokens.method(req, res),
        `${req.baseUrl}${req.path}`,
        methodArguments(req)
    ].join(' ');
}

export default function serviceLogger(app: Express, logService) {
    app.use(morgan(logger, { stream: logService.stream }));
}
