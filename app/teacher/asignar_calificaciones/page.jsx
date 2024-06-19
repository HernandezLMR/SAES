"use server"
import Calif from "../../../components/html/a_calif.jsx";
import {getSession} from "../../../components/actions"
import { redirect } from "next/navigation";






export default async function calif(){
    const session = await getSession();
    if (!session || session.tipo != "maestro"){
        redirect("/")
    }
    

    
    
    return  (
    <Calif/>
    )
}