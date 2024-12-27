import UserController from '../controller/user.controller';
import {NextFunction, Request, Response, Router} from 'express'


class UserRouter{
    public router: Router;
    private userController: UserController

    constructor(){
        this.router = Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/register', (req: Request, res: Response, next: NextFunction) => {
          this.userController.register(req, res, next);
        });

        this.router.post("/login", (req: Request, res: Response, next: NextFunction) =>{
          this.userController.login(req, res, next);
        })
      }
    
}

export default UserRouter