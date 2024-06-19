"use client"

import { useRouter } from "next/navigation";

export default function GetGroup(){
    const router = useRouter();
    const { grupoID } = router.query;
    console.log("Text "+grupoID);
    return grupoID;
}