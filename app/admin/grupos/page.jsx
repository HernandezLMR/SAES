import {getSession} from "../../../components/actions"
import { redirect } from "next/navigation"
import GroupForm from "../../../components/html/ad_grupos"
export default async function Home() {
    const session = await getSession();
    if (!session || session.tipo != "admin"){
        redirect("/")
    }

    return <h1>
        <GroupForm/>
    </h1>
}
