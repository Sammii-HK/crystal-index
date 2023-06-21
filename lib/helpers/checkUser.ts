import { UserSession } from "../types/user";

export const checkSuperUser = (user: UserSession): boolean => {
  return user.role === "unicorn" || user.email === process.env.NEXT_PUBLIC_UNICORN_USER
};

export const getUserSubscription = (user: UserSession): string => {
  return user.role
};

export const checkSub1 = (user: UserSession): boolean => {
  return !!(user.role === 'sub1' || 'unicorn')
};
