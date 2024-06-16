"use client"

import React, { useState } from 'react';

const GroupForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    materia: '',
    maestro: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
        id: formData.id,
        materia: formData.materia,
        maestro: formData.maestro,
        alumnos: []
    }
    try{
      const response = await fetch('/api/create_grupo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      const dataResponse = await response.json();
      console.log(dataResponse);
      setFormData({
        id: '',
        materia: '',
        maestro: ''
      })
      if (response.ok){
        alert(dataResponse.message);
      }

    }
    catch(error){
        console.log(error)
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="materia">Materia:</label>
        <input
          type="text"
          id="materia"
          name="materia"
          value={formData.materia}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="maestro">Maestro (ID):</label>
        <input
          type="text"
          id="maestro"
          name="maestro"
          value={formData.maestro}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Crear Grupo</button>
    </form>
  );
};

export default GroupForm;
