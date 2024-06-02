import jwt from "jsonwebtoken";
import { promisify } from 'util';

type VerifiedData = {
  id: string,
  iat: number,
  exp: number
}

export const verifyToken = async (token: string) => {
  const verify = promisify((tkn: string, cb: jwt.VerifyCallback) => jwt.verify(tkn, process.env.JWT_SECRET!, cb));
   const verifiedData = await verify(token) as unknown as VerifiedData;
  return verifiedData;
}