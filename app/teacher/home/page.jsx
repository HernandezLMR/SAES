import {getSession} from "../../../components/actions"
import { redirect } from "next/navigation"


export default async function Home() {
    const session = await getSession();
    if (!session || session.tipo != "maestro"){
        redirect("/")
    }

    return <h1>
        Bienvenido usuario
        </h1>
}

