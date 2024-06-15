import materias from "../../../components/html/materias.jsx"
import { getSession } from "../../../components/actions.ts"
import { redirect } from "next/navigation"

export default async function Home() {
    const session = await getSession();
    if (!session || session.tipo != "maestro"){
        redirect("/")
    }

    return materias()
}