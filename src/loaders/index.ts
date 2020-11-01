import { Express } from 'express';
import { Logger } from 'winston';

import dbLoader from './db';
import express from './express';
import {
    loadUser,
    loadGroup,
    loadUserGroups,
    loadRefreshToken,
    AuthConfig
} from '../models';
import {
    UserRepository,
    UserMapper,
    GroupRepository,
    GroupMapper,
    UserGroupRepository,
    RefreshTokenMapper,
    RefreshTokenRepository
} from '../data-access';
import {
    UserService,
    GroupService,
    UserGroupService,
    AuthService
} from '../services';
import {
    userValidators,
    groupValidators,
    userGroupValidators,
    authValidators
} from '../api/middlewares/validators';
import {
    userRoute,
    groupRoute,
    userGroupRouter,
    authRouter
} from '../api/routes';
import {
    UserController,
    GroupController,
    UserGroupController,
    AuthController
} from '../api/controllers';
import {
    validationErrorHandler,
    defaultErrorHandler
} from '../api/middlewares/errors';
import { serviceLogger, logger } from '../logging';
import { winstonConfig } from '../config';
import { authHandler } from '../api/middlewares/auth';

export default async (app: Express) => {
    const db = await dbLoader();
    loadGroup(db);
    loadUser(db);
    loadUserGroups(db);
    loadRefreshToken(db);

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
    const refreshTokenRepository = new RefreshTokenRepository(new RefreshTokenMapper);
    const jwtConfig: AuthConfig = {
        secret: process.env.JWT_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        tokenExpirationTime: Number(process.env.JWT_TOKEN_EXP_TIME),
        refreshTokenExpirationTime: Number(process.env.JWT_REFRESH_TOKEN_EXP_TIME)
    }
    const authService = new AuthService(userRepository, refreshTokenRepository, jwtConfig);
    const authController = new AuthController(authService);

    const authMiddleware = authHandler(authService);

    express(app);
    serviceLogger(app, logService);
    groupRoute(app, groupController, groupValidators, authMiddleware);
    userRoute(app, userController, userValidators, authMiddleware);
    userGroupRouter(app, userGroupController, userGroupValidators, authMiddleware);
    authRouter(app, authController, authValidators);
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
