"use server"
import Calif from "../../../components/html/a_calif.jsx";
import {getSession} from "../../../components/actions"
import { redirect } from "next/navigation";






export default async function calif(){
    const session = await getSession();
    if (!session || session.tipo != "maestro"){
        redirect("/")
    }

    const response = await fetch("http://localhost:3000/api/get_period", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
    const data = await response.json();
    console.log(data);
    if (!data.active){
        redirect("/teacher/home");
    }

    
    
    return  (
    <Calif/>
    )
}