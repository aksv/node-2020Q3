import { Request, Response } from 'express';

interface Error {
    name?: string;
    errors?: any[];
    message?: string;
}

abstract class CommonController {
    protected sendNotFound(res: Response, id: string) {
        res.status(404);
        res.json({ error: `Record with id ${id} is not found` });
    }

    protected sendError(res: Response, error: Error) {
        let errorMesage: any;
        if (error?.name === 'SequelizeUniqueConstraintError') {
            res.status(409);
            errorMesage = error.errors.map((err) => ({
                error: err.message
            }));
        } else {
            res.status(500);
            errorMesage = [{ error: error.message || 'Unexpected error' }];
        }
        res.json(errorMesage);
    }
}

export default CommonController;
