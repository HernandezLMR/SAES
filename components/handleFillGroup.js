"use server"


export default async function FillStudents(groupID) {
      
      try {
        //Should proably hide url in env to increase security, not going to though
        const response = await fetch('http://localhost:3000/api/group', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(groupID),
        });

        const dataResponse = await response.json();
        console.log(dataResponse);
        return dataResponse;
        
      } catch (error) {
        console.log(error);
      }
  };
