import dotenv from 'dotenv';
dotenv.config();

export const PORT: string = process.env.PORT!;
export const JWT_KEY: string = process.env.JWT_KEY!;
export const ORIGIN: string = process.env.ORIGIN!;
export const DATABASE_URL: string = process.env.DATABASE_URL!;
export const ADMIN: string = process.env.ADMIN!;
export const PASSWORD: string = process.env.PASSWORD!;

