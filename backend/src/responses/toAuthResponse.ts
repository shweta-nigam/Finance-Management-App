import { IUser } from "../models/user.model";

export function toAuthResponse(user: IUser, accessToken?: string) {
  return {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    avatar: user.avatar || null,
    isVerified: user.isVerified ?? false,
    role: user.role,
    isPlanActive: user.isPlanActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    accessToken: accessToken || user.accessToken || undefined,
  };
}
