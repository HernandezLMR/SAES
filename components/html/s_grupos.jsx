"use client"

import React, { useState, useEffect } from 'react';
import AddStudent from '../handleAddStudent';
import styles from "../grupos_styles.module.css";

function GroupSearchAndAdd() {
  
  const [searchMateria, setSearchMateria] = useState('');
  const [groupData, setGroupData] = useState("");

  const handleSearchChange = (e) => {
    setSearchMateria(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/find_grupo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ materia: searchMateria }),
      });
      const dataResponse = await response.json();
      const data = JSON.parse(dataResponse.group);
      

      //Find teacher name with id
      const tName = data.maestro;
      
      const ress = await fetch('/api/find_maestro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matricula: tName }),
      });

      const dataress = await ress.json();
      console.log(dataress.nombre);
      data.maestro = dataress.nombre;
      
      
      
      setGroupData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (groupData) {
      console.log(groupData);
      console.log(groupData.id);
      console.log(groupData.materia);
      console.log(groupData.maestro);
    }
  }, [groupData]);

  async function handleAddStudent() {
    const message = await AddStudent(groupData);
    
    alert(message.message);
  }

  return (
    <div>
      <form className={styles.submit} onSubmit={handleSearchSubmit}>
        <div>
          <label htmlFor="searchMateria">Materia:</label>
          <input
            type="text"
            id="searchMateria"
            name="searchMateria"
            value={searchMateria}
            onChange={handleSearchChange}
            required
          />
        </div>
        <button type="submit">Buscar Grupo</button>
      </form>

      {groupData && (
        <div>
          <h2>Grupo Encontrado</h2>
          <table className="table" border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Materia</th>
                <th>Maestro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{groupData.id}</td>
                <td>{groupData.materia}</td>
                <td>{groupData.maestro}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={handleAddStudent}>Agregar Estudiante</button>
        </div>
      )}
    </div>
  );
}

export default GroupSearchAndAdd;
