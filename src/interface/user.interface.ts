import { Role } from "../constants/constant";
import mongoose from "mongoose";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: Role;
    username: string;
    isVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ILogin{
    email: string;
    password: string;
}