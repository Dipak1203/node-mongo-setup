import { NextFunction, Request, Response } from "express";
import Admin from "../model/admin/admin.model";
import CustomErrorHandler from "../services/CustomErrorHandler";

const admin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return next(CustomErrorHandler.unAuthorized());
    }

    try {
        const admin = await Admin.findOne({ _id: req.user._id });

        if (admin && admin.role === 'admin') {
            next();
        } else {
            return next(CustomErrorHandler.unAuthorized());
        }
    } catch (error) {
        return next(CustomErrorHandler.serverError());
    }
}

export default admin;
