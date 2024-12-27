import { IAdmin } from '../../interface/admin.interface';
import mongoose, { Document, Schema, model } from 'mongoose';



const adminSchema = new Schema<IAdmin>({
    name: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    role: { type: String, required: true },
}, { timestamps: true });

const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin;
