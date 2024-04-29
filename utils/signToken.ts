import jwt from "jsonwebtoken";

export const signToken = (id: number) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}