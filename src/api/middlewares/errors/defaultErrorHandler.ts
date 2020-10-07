import { Request, Response } from 'express';
import { Logger } from 'winston';

export default function defaultErrorHandler(logger: Logger) {
    return (err, req: Request, res: Response, next) => {
        logger.log(
            'error',
            `${req.method} ${req.baseUrl}${req.path}`,
            {
                message: err
            }
        );
        if (res.headersSent) {
            return next(err);
        }
        res.status(500);
        res.json({ error: err.message });
    };
}
