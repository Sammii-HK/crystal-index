import { UserSession } from "../types/user";

export const checkUser = (user: UserSession): boolean => {
  return user.role === "unicorn" || user.email === process.env.NEXT_PUBLIC_UNICORN_USER
};