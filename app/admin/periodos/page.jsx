import {getSession} from "../../../components/actions"
import { redirect } from "next/navigation"
import SetPeriods from "../../../components/html/ad_periodos"
export default async function Home() {
    const session = await getSession();
    if (!session || session.tipo != "admin"){
        redirect("/")
    }

    return <h1>
        <SetPeriods/>
    </h1>
}
