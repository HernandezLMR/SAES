// ../../../components/GetGroup.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GetGroup() {
    const router = useRouter();
    
    const [grupoID, setGrupoID] = useState("");


    useEffect(() => {
        
        console.log("ID: "+ router.grupoID);
    }, [router.query]);
    

    if (!grupoID) {
        return <div>Loading...</div>;
    }

    return (
        <h1>{grupoID}</h1>
    );
}
