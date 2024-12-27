import { Schema, model } from 'mongoose';
import { IUser } from '../../interface/user.interface';
import { Role } from '../../constants/constant';



const userSchema = new Schema<IUser>({
    name: { type: String, required: false },
    username: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    role: { type: String, required: false, default: Role.USER },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

const User = model<IUser>('User', userSchema);

export default User;
