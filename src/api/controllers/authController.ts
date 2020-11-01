import { Request, Response } from 'express';

import { AuthService } from '../../services';
import { AuthInfo, SignInInfo } from '../../models';
import { authValidators } from '../middlewares/validators';

export default class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    signIn = async (req: Request, res: Response) => {
        const signInInfo: SignInInfo = req.body;
        const authInfo: AuthInfo = await this.authService.signIn(signInInfo);
        res.json(authInfo);
    }

    refresh = async (req: Request, res: Response) => {
        const { refreshToken } = req.body;
        const authInfo: AuthInfo = await this.authService.refresh(refreshToken);
        res.json(authInfo);
    }
}