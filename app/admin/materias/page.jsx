import {getSession} from "../../../components/actions"
import { redirect } from "next/navigation"
import MateriasForm from "../../../components/html/ad_materias"
export default async function Home() {
    const session = await getSession();
    if (!session || session.tipo != "admin"){
        redirect("/")
    }

    return <h1>
        <MateriasForm/>
    </h1>
}
