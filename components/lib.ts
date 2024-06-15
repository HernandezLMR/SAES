import { SessionOptions } from "iron-session";

export interface SessionData {
    matricula?: string;
    nombre?: string;
    tipo?: string;
    isLoggedIn?: boolean;
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET_KEY!,
    cookieName: "session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }
}