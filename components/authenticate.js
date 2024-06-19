"use server"
import { getSession } from "../components/actions"

export default async function Auth(req){
    const session = await getSession();
    if (!session || session.tipo != req){
        return false;
    }
};