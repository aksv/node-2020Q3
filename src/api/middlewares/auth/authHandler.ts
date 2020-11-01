import { Request, Response } from 'express';
import { AuthService } from '../../../services';

export default function authHandler(authService: AuthService) {
    return (req: Request, res: Response, next) => {
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const bearer = authHeader.split(' ');
            if (bearer.length !== 2) {
                res.status(400);
                res.json({
                    code: 400,
                    message: 'Invalid authentication header'
                });
            } else {
                const token = bearer[1];
                if (authService.checkToken(token)) {
                    next();
                } else {
                    res.status(403);
                    res.json({
                        code: 403,
                        message: 'Invalid token'
                    });
                }
            }
        } else {
            res.status(400);
            res.json({
                code: 400,
                message: 'No authentication header found'
            });
        }
    };
}