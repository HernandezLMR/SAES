"use client"
import styles from "../grupos_styles2.module.css"

import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    matricula: '',
    nombre: '',
    contrasena: '',
    tipoUsuario: ''
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
        matricula: formData.matricula,
        nombre: formData.nombre,
        password: formData.contrasena,
        tipo: formData.tipoUsuario
    }
    try{
      const response = await fetch('/api/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      const dataResponse = await response.json();
      console.log(dataResponse);
      setFormData({
        matricula: '',
        nombre: '',
        contrasena: '',
        tipoUsuario: ''
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
    <form className={styles.submit} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="matricula">Matricula:</label>
        <input
          type="text"
          id="matricula"
          name="matricula"
          value={formData.matricula}
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
        <label htmlFor="contrasena">Contraseña:</label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          value={formData.contrasena}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="tipoUsuario">Tipo de usuario:</label>
        <select
          id="tipoUsuario"
          name="tipoUsuario"
          value={formData.tipoUsuario}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione</option>
          <option value="admin">Admin</option>
          <option value="estudiante">Estudiante</option>
          <option value="maestro">Maestro</option>
        </select>
      </div>
      <button type="submit">Crear Usuario</button>
    </form>
  );
};

export default UserForm;
