import { Request, Response, Router } from 'express';
import UserRouter from './user.routes';

class AppRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use('/user', new UserRouter().router);

        this.router.get('/', (req, res) => {
            res.send('API is running...');
        });

    }
}



export default new AppRouter().router;