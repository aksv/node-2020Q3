import { Express } from 'express';
import { Logger } from 'winston';

import dbLoader from './db';
import express from './express';
import { loadUser, loadGroup, loadUserGroups } from '../models';
import {
    UserRepository,
    UserMapper,
    GroupRepository,
    GroupMapper,
    UserGroupRepository
} from '../data-access';
import {
    UserService,
    GroupService,
    UserGroupService
} from '../services';
import {
    userValidators,
    groupValidators,
    userGroupValidators
} from '../api/middlewares/validators';
import {
    userRoute,
    groupRoute,
    userGroupRouter
} from '../api/routes';
import {
    UserController,
    GroupController,
    UserGroupController
} from '../api/controllers';
import {
    validationErrorHandler,
    defaultErrorHandler
} from '../api/middlewares/errors';
import { serviceLogger, logger } from '../logging';
import { winstonConfig } from '../config';

export default async (app: Express) => {
    const db = await dbLoader();
    loadGroup(db);
    loadUser(db);
    loadUserGroups(db);

    const logService: Logger = logger(winstonConfig);

    const groupRepository = new GroupRepository(new GroupMapper());
    const groupService = new GroupService(groupRepository);
    const groupController = new GroupController(
        groupService,
        logService
    );
    const userRepository = new UserRepository(new UserMapper());
    const userService = new UserService(userRepository);
    const userController = new UserController(
        userService,
        logService
    );
    const userGroupRepository = new UserGroupRepository(db);
    const userGroupService = new UserGroupService(
        userGroupRepository
    );
    const userGroupController = new UserGroupController(
        userGroupService,
        logService
    );

    express(app);
    serviceLogger(app, logService);
    groupRoute(app, groupController, groupValidators);
    userRoute(app, userController, userValidators);
    userGroupRouter(app, userGroupController, userGroupValidators);
    app.use(validationErrorHandler);

    const defaultHandler = defaultErrorHandler(logService);
    app.use(defaultHandler);

    process.on('unhandledRejection', (error) => {
        logService.log('error', 'unhandledRejection', {
            message: error
        });
    });

    process.on('uncaughtException', (error) => {
        logService.log('error', 'uncaughtException', {
            message: error
        });
    });
};
