import { Request, Response } from 'express';

import { UserGroupService } from '../../services';
import { UserGroup } from '../../models';
import CommonController from './commonController';

export default class UserGroupController extends CommonController {
    private userGroupService: UserGroupService;

    constructor(userGroupService: UserGroupService) {
        super();
        this.userGroupService = userGroupService;
    }

    addUsersToGroup = async (req: Request, res: Response) => {
        const groupId: string = req.params.id;
        const userIds: Array<string> = req.body.userIds;
        try {
            const created: Array<UserGroup> =
                await this.userGroupService.addUsersToGroup(groupId, userIds);
            res.json(created);
        } catch (err) {
            this.sendError(res, err);
        }
    }
}