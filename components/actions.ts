"use server"
import { sessionOptions, SessionData, defaultSession } from "./lib"
import { getIronSession } from "iron-session"
import {cookies} from "next/headers"
import  { redirect }  from "next/navigation"

export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(),sessionOptions)

    if(!session.isLoggedIn){
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    return session;
}

export const login = async (matr, type, nombre) => {
    const session = await getSession();
    session.isLoggedIn = true;
    session.matricula = matr;
    session.nombre = nombre;
    session.tipo = type;
    await session.save();

}

export const logout = async () => {
    const session = await getSession();
    session.destroy();
    redirect("/");
}