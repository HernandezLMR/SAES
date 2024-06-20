"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FillStudents from "../handleFillGroup"; // Assume this function returns the required data

export default function GetGroup() {
    const searchParams = useSearchParams();
    const [grupoID, setGrupoID] = useState("");
    const [students, setStudents] = useState([]);
    const [grades, setGrades] = useState({});

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

    const handleGradeChange = (id, value) => {
        setGrades(prevGrades => ({
            ...prevGrades,
            [id]: value,
        }));
    };

    const handleSubmit = async () => {
        // Send the grades to the database
        
         const response = await fetch('/api/submit_grades', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(grades),
         });
        console.log("Grades submitted");
    };

    if (!grupoID) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>Grupo: 4IV1</p>
            <p>Materia: Análisis y diseño de sistemas</p>
            <p>Evaluación: Primer parcial</p>
            <p>Fecha límite: 27/06/2024</p>
            <table className="table" border="1">
                <thead>
                    <tr>
                        <th>Matricula</th>
                        <th>Nombre</th>
                        <th>Calificación guardada</th>
                        <th>Calificación</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.savedGrade ?? 'N/A'}</td>
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
            <button onClick={handleSubmit}>Submit Grades</button>
        </div>
    );
}
