"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FillStudents from "../handleFillGroup"; // Assume this function returns the required data

export default function GetGroup() {
    const searchParams = useSearchParams();
    const [grupoID, setGrupoID] = useState("");
    const [students, setStudents] = useState([]);
    const [grades, setGrades] = useState({});
    const [evalPeriod, setEvalPeriod] = useState("");
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        const grupoIDParam = searchParams.get("grupoID");
        if (grupoIDParam) {
            setGrupoID(grupoIDParam);
            console.log("ID: " + grupoIDParam);
        }
    }, [searchParams]);

    useEffect(() => {
        if (grupoID) {
            const fetchStudents = async () => {
                const studentsData = await FillStudents(grupoID);
                setStudents(studentsData);
                // Initialize grades state
                const initialGrades = {};
                studentsData.forEach(student => {
                    initialGrades[student.id] = student.savedGrade || '';
                });
                setGrades(initialGrades);
            };
            fetchStudents();
        }
    }, [grupoID]);

    useEffect(() => {
        //Get evaluation period number
        if (grupoID) {
            const fetchEvalPeriod = async () => {
                const result = await fetch("http://localhost:3000/api/get_period", {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    }
                  });
                const data = await result.json();
                setEvalPeriod(data.period);
            };
            fetchEvalPeriod();
        }
    })

    useEffect(() => {
        const grupoMateria = searchParams.get("grupoM");
        if (grupoMateria) {
            setNombre(grupoMateria);
            console.log("ID: " + grupoMateria);
        }
    }, [searchParams]);

    const handleGradeChange = (id, value) => {
        setGrades(prevGrades => ({
            ...prevGrades,
            [id]: value,
        }));
    };

    const handleSubmit = async() => {

        // Send the grades to the database
        
         const response = await fetch('/api/submit_grades', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({calif : grades, gID: grupoID, periodo: evalPeriod, gNom: nombre}),
         });
        console.log("Grades submitted");
    };

    if (!grupoID) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>Grupo: {grupoID}</p>
            <p>Materia: {nombre}</p>
            <p>Evaluación: {"Parcial "+evalPeriod}</p>
            <table className="table" border="1">
                <thead>
                    <tr>
                        <th>Matricula</th>
                        <th>Nombre</th>
                        
                        <th>Calificación</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            
                            <td>
                                <select
                                    id={`calificaciones-${student.id}`}
                                    value={grades[student.id] || ''}
                                    onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                >
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((grade) => (
                                        <option key={grade} value={grade}>{grade}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSubmit}>Subir calificaciones</button>
        </div>
    );
}
