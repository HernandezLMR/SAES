"use client"

import React, { useState, useEffect } from 'react';
import GetGroups from "../handleGetGroups";
import { useHistory } from 'react-router-dom';

export default function Materias() {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchGrupos = async () => {
      let result = await GetGroups();
      console.log("Final response to front end:"+result);
      if (result) {
        setGrupos(result);
      } else {
        console.log("No groups found or invalid response structure");
      }
    };

    fetchGrupos();
  }, []);

  return (
    <div>
      <table className="table" border="1">
        <tbody>
          <tr>
            <th>Grupo</th>
            <th>Materia</th>
          </tr>
          {grupos.map((grupo, index) => (
            <tr key={index}>
              <td>{grupo.id}</td>
              <td>{grupo.materia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
