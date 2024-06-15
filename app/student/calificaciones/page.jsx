import Calificacion from "../../../components/html/calif"
import {getSession} from "../../../components/actions"
import { redirect } from "next/navigation"

export default async function calif(){
    const session = await getSession();
    if (!session || session.tipo != "estudiante"){
        redirect("/")
    }

    return(
        <Calificacion/>
    )
}