import React from 'react';
import LoginPage from '../components/html/loginPage';
import {getSession} from "../components/actions"
import { redirect } from "next/navigation"
import estilo_login from './estilo_login.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default async function HomePage() {
  const session = await getSession();
  if (session.isLoggedIn === true) {
    if (session.tipo === "estudiante"){
      redirect("/student/home")
    }
    if (session.tipo === "maestro"){
      redirect("/teacher/home")
    }
    if (session.tipo === "admin"){
      redirect("/admin/home")
    }
}

  return (
    <div>
      <LoginPage />
    </div>
  );
}