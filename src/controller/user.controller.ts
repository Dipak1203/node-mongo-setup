import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import CustomErrorHandler from '../services/CustomErrorHandler';

class UserController {
  constructor() {}

  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { access_token, refresh_token } = await UserService.registerUser(req.body);
      res.json({ access_token, refresh_token });
    } catch (error:any) {
      if (error.isJoi) {
        return next(error);
      }
      return next(CustomErrorHandler.serverError(error.message));
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const { access_token, refresh_token } = await UserService.loginUser(req.body);
      res.json({ access_token, refresh_token });
    } catch (error:any) {
      if (error.isJoi) {
        return next(error);
      }
      return next(CustomErrorHandler.serverError(error.message));
    } 
  }
}

export default UserController;
