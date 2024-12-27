import { JWT_SECRET, SESSION_EXPIRE_DAY } from '../config';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';

interface JwtPayload {
  [key: string]: any;
}

class JwtService {
  static sign(payload: JwtPayload, expiry: string | number = SESSION_EXPIRE_DAY!, secret: Secret = JWT_SECRET!): string {
    const options: SignOptions = {
      expiresIn: expiry,
    };
    return jwt.sign(payload, secret, options);
  }

  static verify(token: string, secret: Secret = JWT_SECRET!): JwtPayload | string {
    return jwt.verify(token, secret) as JwtPayload | string;
  }
}

export default JwtService;
