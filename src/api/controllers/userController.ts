import { Request, Response } from 'express';
import { Logger } from 'winston';

import { UserService } from '../../services';
import { User, UserInfo } from '../../models';
import CommonController from './commonController';
import { controllerErrorInfo } from '../../utils';

export default class UserController extends CommonController {
    private userService: UserService;
    private logger: Logger;

    constructor(userService: UserService, logger: Logger) {
        super();
        this.userService = userService;
        this.logger = logger;
    }

    createUser = async (req: Request, res: Response) => {
        const user: User = req.body;
        try {
            const created = await this.userService.createUser(user);
            res.json(created);
        } catch (err) {
            this.logger.error(controllerErrorInfo(req, err.message));
            this.sendError(res, err);
        }
    };

    getUserById = async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const user: UserInfo = await this.userService.getUserById(id);
        if (!user) {
            this.sendNotFound(res, id);
        } else {
            res.json(user);
        }
    };

    updateUser = async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const user: User = req.body;
        const updated: User = await this.userService.updateUser(
            id,
            user
        );
        if (!updated) {
            this.sendNotFound(res, id);
        } else {
            res.json(user);
        }
    };

    deleteUser = async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const isDeleted = await this.userService.deleteUser(id);
        if (!isDeleted) {
            this.sendNotFound(res, id);
        } else {
            res.status(204);
            res.end();
        }
    };

    getAutoSuggestUsers = async (req: Request, res: Response) => {
        const { loginSubstring, limit } = req.query;
        const users: Array<User> = await this.userService.getAutoSuggest(
            {
                loginSubstr: String(loginSubstring),
                limit: Number(limit)
            }
        );
        res.json(users);
    };
}
