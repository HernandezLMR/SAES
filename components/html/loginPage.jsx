"use client"
// pages/api/auth.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from "../actions"
import { Carousel } from 'react-bootstrap';


function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password}),
      });
      
      const data = await response.json();

      if (response.ok) {
        /* Test messages
        console.log('Success:', data.message);
        console.log(data.userType);
      } else {
        console.log('Error:', data.message);
        alert(data.message)
        */

        //Create session
        login(username, data.tp, data.nm)

        //Redirect user
        if (data.rdLoc === 1){
          router.push("/student/home");
        }
        else if (data.rdLoc === 2){
          router.push("/teacher/home");
        }
        else if (data.rdLoc === 3){
          router.push("/admin/home");
        }
        else {
          console.log('Error:', data.message);
          alert(data.message);
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <>
      
      <main className="bg-gray-100 py-8">
        <div className="content-container">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://www.ipn.mx/assets/files/ccs/img/identidad/2024/06/hackaton.jpg"
                alt="Imagen 1"
              />
              <Carousel.Caption>
                <h5>Politécnicos en el podio</h5>
                <p>de HackMéxico 2024</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://www.ipn.mx/assets/files/ccs/img/identidad/2024/05/ipn-dengue.jpg"
                alt="Imagen 2"
              />
              <Carousel.Caption>
                <h5>Logra IPN patente por el estudio sobre dengue</h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://www.ipn.mx/assets/files/ccs/img/identidad/2024/06/futbol.jpg"
                alt="Imagen 3"
              />
              <Carousel.Caption>
                <h5>Homenaje a la leyenda</h5>
                <p>del futbol americano en México</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <div className="bg-white p-8 mt-8 shadow-md rounded">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">¡Bienvenido!</h2>
              <div>
                <label htmlFor="boleta" className="block text-sm font-medium text-gray-700">Boleta</label>
                <input
                  type="text"
                  id="boleta"
                  name="boleta"
                  value={username}
                  onChange={handleUsernameChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  value={password}
                  onChange={handlePasswordChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
