import {Router} from 'express'


class AdminRouter{
    public router: Router;
    // private adminController: AdminController

    constructor(){
        this.router = Router();
        // this.adminController = new AdminController();
        this.initilizedRoute();
    }

    private initilizedRoute(): void{
    //    this.router.get("/", this.adminController.test)
    }
    
}

export default AdminRouter