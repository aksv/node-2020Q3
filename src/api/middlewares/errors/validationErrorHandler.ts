import { Request, Response } from 'express';

//TODO: add error type
export default function validationErrorHandler(err, req: Request, res: Response, next: Function) {
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            type: err.type,
            message: err.error.toString()
        });
    } else {
        return next(err);
    }
}
