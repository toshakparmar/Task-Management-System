import * as jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  email: string;
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'your-access-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';
const ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY || '15m';
const REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d';

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(
    payload,
    ACCESS_SECRET as jwt.Secret,
    { expiresIn: ACCESS_EXPIRY as jwt.SignOptions['expiresIn'] }
  );
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(
    payload,
    REFRESH_SECRET as jwt.Secret,
    { expiresIn: REFRESH_EXPIRY as jwt.SignOptions['expiresIn'] }
  );
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, ACCESS_SECRET as jwt.Secret) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, REFRESH_SECRET as jwt.Secret) as TokenPayload;
};
