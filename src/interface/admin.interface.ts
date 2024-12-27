import mongoose from "mongoose";

export interface IAdmin extends Document {
    _id: mongoose.Types.ObjectId;
    name?: string;
    email?: string;
    password?: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}