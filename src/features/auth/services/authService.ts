import jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: string;
}

export class AuthService {
  async validateUser(payload: JwtPayload): Promise<{ id: string } | null> {
    // Simulate user validation logic
    return { id: payload.userId };
  }

  async login(user: { id: string }) {
    const payload: JwtPayload = { userId: user.id };
    return {
      accessToken: generateToken(payload, 'your-secret-key'),
    };
  }
}

export const generateToken = (payload: object, secret: string, options?: jwt.SignOptions): string => {
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string, secret: string): object | string => {
  return jwt.verify(token, secret);
};