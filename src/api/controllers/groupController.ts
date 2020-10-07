import { Request, Response } from 'express';
import { Logger } from 'winston';

import { GroupService } from '../../services';
import { Group } from '../../models';
import CommonController from './commonController';
import { controllerErrorInfo } from '../../utils';

export default class GroupController extends CommonController {
    private groupService: GroupService;
    private logger: Logger;

    constructor(groupService: GroupService, logger: Logger) {
        super();
        this.groupService = groupService;
        this.logger = logger;
    }

    createGroup = async (req: Request, res: Response) => {
        const group = req.body;
        try {
            const created = await this.groupService.createGroup(
                group
            );
            res.json(created);
        } catch (err) {
            this.logger.error(controllerErrorInfo(req, err.message));
            this.sendError(res, err);
        }
    };

    getGroups = async (req: Request, res: Response) => {
        const groups = await this.groupService.getGroups();
        res.json(groups);
    };

    getGroupById = async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const group = await this.groupService.getGroupById(id);
        if (!group) {
            this.sendNotFound(res, id);
        } else {
            res.json(group);
        }
    };

    updateGroup = async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const update: Group = req.body;
        try {
            const updated: Group = await this.groupService.updateGroup(
                id,
                update
            );
            if (!updated) {
                this.sendNotFound(res, id);
            } else {
                res.json(updated);
            }
        } catch (err) {
            this.logger.error(controllerErrorInfo(req, err.message));
            this.sendError(res, err);
        }
    };

    deleteGroup = async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const deleted: number = await this.groupService.deleteGroup(
            id
        );
        if (deleted == 0) {
            this.sendNotFound(res, id);
        } else {
            res.status(204);
            res.end();
        }
    };
}
