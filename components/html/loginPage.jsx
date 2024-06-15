"use client"
// pages/api/auth.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from "../actions"


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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Matricula:</label>
          <input 
            type="text" 
            value={username} 
            onChange={handleUsernameChange} 
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={handlePasswordChange} 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
