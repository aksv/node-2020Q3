import { Request, Response } from 'express';
import { Logger } from 'winston';

import { UserGroupService } from '../../services';
import { UserGroup } from '../../models';
import CommonController from './commonController';
import { controllerErrorInfo } from '../../utils';

export default class UserGroupController extends CommonController {
    private userGroupService: UserGroupService;
    private logger: Logger;

    constructor(userGroupService: UserGroupService, logger: Logger) {
        super();
        this.userGroupService = userGroupService;
    }

    addUsersToGroup = async (req: Request, res: Response) => {
        const groupId: string = req.params.id;
        const userIds: Array<string> = req.body.userIds;
        try {
            const created: Array<UserGroup> = await this.userGroupService.addUsersToGroup(
                groupId,
                userIds
            );
            res.json(created);
        } catch (err) {
            this.logger.error(controllerErrorInfo(req, err.message));
            this.sendError(res, err);
        }
    };
}
