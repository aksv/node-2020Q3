import { Request, Response } from 'express';

export default function asyncErrorHandler(fn) {
    return (req: Request, res: Response, next) => {
        const promise = fn(req, res, next);
        if (promise.catch) {
            promise.catch((err) => next(err));
        }
    };
}
