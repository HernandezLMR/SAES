"use client"

import React, { useState } from 'react';

const MateriasForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    semestre: ''
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
        nombre: formData.nombre,
        semestre: formData.semestre
    }
    try{
      const response = await fetch('/api/create_materia', {
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
        nombre: '',
        semestre: ''
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
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="semestre">Semestre:</label>
        <input
          type="text"
          id="semestre"
          name="semestre"
          value={formData.semestre}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Crear Materia</button>
    </form>
  );
};

export default MateriasForm;
