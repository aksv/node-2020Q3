import { Request, Response } from 'express';

import { UserService } from '../../services';
import { User } from '../../models';

interface Error {
  name?: string;
  errors?: any[];
}

export default class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  private sendNotFound(res: Response, id: string) {
    res.status(404);
    res.json({ error: `User with id ${id} is not found` });
  }

  private sendError(res: Response, error: Error) {
    let errorMesage: any;
    if (error?.name === 'SequelizeUniqueConstraintError') {
        res.status(409);
        errorMesage = error.errors.map(err => ({ error: err.message }));
    } else {
        res.status(500);
        errorMesage = [{ error: 'Unexpected error' }];
    }
    res.json(errorMesage);
}

  createUser = async (req: Request, res: Response) => {
    const user: User = req.body;
    try {
      const created = await this.userService.createUser(user);
      res.json(created);
    } catch (err) {
      this.sendError(res, err);
    }
  }

  getUserById = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const user = await this.userService.getUserById(id);
    if (!user) {
        this.sendNotFound(res, id);
    } else {
        res.json(user);
    }
  }

  updateUser = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const user: User = req.body;
    const updated: User = await this.userService.updateUser(id, user);
    if (!updated) {
      this.sendNotFound(res, id);
    } else {
      res.json(user);
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const isDeleted = await this.userService.deleteUser(id);
    if (!isDeleted) {
      this.sendNotFound(res, id);
    } else {
      res.status(204);
      res.end();
    }
  }

  getAutoSuggestUsers = async (req: Request, res: Response) => {
    const { loginSubstring, limit } = req.query;
    const users: Array<User> = await this.userService.getAutoSuggest(
      {
        loginSubstr: String(loginSubstring),
        limit: Number(limit)
      }
    );
    res.json(users);
  }
}