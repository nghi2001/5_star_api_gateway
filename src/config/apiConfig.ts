import dotenv from 'dotenv';
dotenv.config()
export const AuthApi = process.env.AUTH_SERVICE;
export const PostService = process.env.POST_SERVICE