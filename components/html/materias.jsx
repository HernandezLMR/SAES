"use client"

import React, { useState, useEffect } from 'react';
import GetGroups from "../handleGetGroups";
import { useRouter } from 'next/navigation';

export default function Materias() {
  const [grupos, setGrupos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGrupos = async () => {
      let result = await GetGroups();
      
      if (result) {
        setGrupos(result);
      } else {
        console.log("No groups found or invalid response structure");
      }
    };

    fetchGrupos();
  }, []);

  function handleRowClick(grupoID){
    router.push(`/teacher/asignar_calificaciones?grupoID=${grupoID}`)
  }

  return (
    <div>
      <table className="table" border="1">
        <tbody>
          <tr>
            <th>Grupo</th>
            <th>Materia</th>
          </tr>
          {grupos.map((grupo, index) => (
            <tr key={index} onClick={() => handleRowClick(grupo.id)}>
              <td>{grupo.id}</td>
              <td>{grupo.materia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
