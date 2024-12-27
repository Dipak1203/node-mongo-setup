import bcrypt from 'bcrypt';
import { REFRESH_SECRET, SESSION_EXPIRE_DAY } from '../config';
import refreshTokenModel from '../model/refreshToken.model';
import User from '../model/user/user.model';
import CustomErrorHandler from './CustomErrorHandler';
import JwtService from './JwtServices';
import { ILogin, IUser } from '../interface/user.interface';
import { loginSchema, registerSchema } from '../validation/user.validation';

class UserService {
  async registerUser(data: IUser): Promise<{ access_token: string; refresh_token: string }> {
    const { error } = registerSchema.validate(data);

    if (error) {
      throw error;
    }

    const { name, email, password } = data;

    const exist = await User.exists({ email });
    if (exist) {
      throw CustomErrorHandler.alreadyExist("This email is already taken.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const result = await user.save();

    const access_token = JwtService.sign({ _id: result._id, role: result.role });
    const refresh_token = JwtService.sign({ _id: result._id, role: result.role }, '1y', REFRESH_SECRET);

    await refreshTokenModel.create({ token: refresh_token });

    return { access_token, refresh_token };
  }

  async loginUser(data: ILogin): Promise<{ access_token: string; refresh_token: string }> {
    const { error } = loginSchema.validate(data);

    if (error) {
      throw error;
    }

    const { email, password } = data;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw CustomErrorHandler.notFound('User not found');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw CustomErrorHandler.unAuthorized('Incorrect password');
      }
      const access_token = JwtService.sign( { _id: user._id, role: user.role, username: user.username, email:user.email });

      const refresh_token = JwtService.sign(
        { _id: user._id, role: user.role, username: user.username, email:user.email },
        SESSION_EXPIRE_DAY,
        REFRESH_SECRET
      );

      await refreshTokenModel.create({ token: refresh_token });
      return ({ access_token, refresh_token });

    } catch (error:any) {
      throw CustomErrorHandler.serverError(error.message);
    }
  }
}

export default new UserService();
