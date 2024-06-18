"use server"

import { getSession } from "./actions"

export default async function AddStudent(groupData) {
    "use server"
    const session = await getSession();
    if (groupData ) {
      const data = {
        nombre: session.nombre,
        id: groupData.id
      };
      
      try {
        //Should proably hide url in env to increase security, not going to though
        const response = await fetch('http://localhost:3000/api/add_estudiante', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });

        const dataResponse = await response.json();
        return dataResponse;
        
      } catch (error) {
        console.log(error);
      }
    }
  };
