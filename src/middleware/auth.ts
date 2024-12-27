import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtServices";

interface DecodedToken extends JwtPayload {
  _id: string;
  role: string;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = JwtService.verify(token) as DecodedToken;
    const user = {
      _id: decoded._id,
      role: decoded.role
    };
    req.user = user;
    next();
  } catch (error) {
    return next(CustomErrorHandler.unAuthorized());
  }
};

export default auth;
