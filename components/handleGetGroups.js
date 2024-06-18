"use server"

import { getSession } from "./actions"

export default async function GetGroups() {
    try {
        const session = await getSession();
        const response = await fetch('http://localhost:3000/api/find_teacher_grupos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({maestro : session.matricula}),
        });
        const dataResponse = await response.json();
        
        
        return dataResponse.groups
        
      } catch (error) {
        console.log("Error fetching groups data:", error);
      }
}