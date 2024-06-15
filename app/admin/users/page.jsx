import UserForm from "../../../components/html/ad_usuarios";
import {getSession} from "../../../components/actions"

export default async function Create (){
    const session = await getSession();
    if (!session || session.tipo != "admin"){
        redirect("/")
    }


    return(
        <UserForm />
    )
}