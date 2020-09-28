import { Express } from 'express';

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
import { UserService, GroupService, UserGroupService } from '../services';
import {
    userValidators,
    groupValidators,
    userGroupValidators
} from '../api/middlewares/validators';
import { userRoute, groupRoute, userGroupRouter } from '../api/routes';
import { UserController, GroupController, UserGroupController } from '../api/controllers';
import { validationErrorHandler } from '../api/middlewares/errors';

export default async (app: Express) => {
    const db = await dbLoader();
    loadGroup(db);
    loadUser(db);
    loadUserGroups(db);
    const groupRepository = new GroupRepository(new GroupMapper());
    const groupService = new GroupService(groupRepository);
    const groupController = new GroupController(groupService);
    const userRepository = new UserRepository(new UserMapper());
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    const userGroupRepository = new UserGroupRepository(db);
    const userGroupService = new UserGroupService(userGroupRepository);
    const userGroupController = new UserGroupController(userGroupService);

    express(app);
    groupRoute(app, groupController, groupValidators);
    userRoute(app, userController, userValidators);
    userGroupRouter(app, userGroupController, userGroupValidators);
    app.use(validationErrorHandler);
};
