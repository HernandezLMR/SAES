import GroupSearchAndAdd from "../../../components/html/s_grupos"
import {getSession} from "../../../components/actions"
import { redirect } from "next/navigation"

export default async function calif(){
    const session = await getSession();
    if (!session || session.tipo != "estudiante"){
        redirect("/")
    }

    return(
        <GroupSearchAndAdd/>
    )
}