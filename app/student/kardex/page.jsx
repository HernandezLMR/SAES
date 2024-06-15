import Kardex from "../../../components/html/kardex.jsx"
import {getSession} from "../../../components/actions"
import { redirect } from "next/navigation"


export default async function kard(){
    const session = await getSession();
    if (!session || session.tipo != "estudiante"){
        redirect("/")
    }

    return(
        <Kardex/>
    )
}