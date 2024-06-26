"use server"
import { getSession } from "../actions"
import DB from "../database"

export default async function Kardex() {
    const session = await getSession();
    const client = await DB();
    const connection = client.db('SAES');
    let calificaciones = [];
    let promedio = 0;

    try {
        const userDB = await connection.collection("Calificaciones");
        const materiasDB = await connection.collection("Materias");
        const matricula = session.matricula;

        // Fetch calificaciones
        const calificacionesResult = await userDB.find({ "estudianteID": matricula, "completed": true }).toArray();

        // Fetch materias and their respective semesters
        const materiasNombres = calificacionesResult.map(calificacion => calificacion.materiaNombre);
        const materiasResult = await materiasDB.find({ "nombre": { $in: materiasNombres } }).toArray();

        // Create a map of materiaNombre to semestre
        const materiasMap = {};
        materiasResult.forEach(materia => {
            materiasMap[materia.nombre] = materia.semestre;
        });

        // Combine data and group by semester
        let totalCalificaciones = 0;
        let numCalificaciones = 0;
        calificaciones = calificacionesResult.map(calificacion => {
            totalCalificaciones += parseFloat(calificacion.final);
            numCalificaciones++;
            return {
                ...calificacion,
                semestre: materiasMap[calificacion.materiaNombre]
            };
        }).reduce((acc, calificacion) => {
            if (!acc[calificacion.semestre]) {
                acc[calificacion.semestre] = [];
            }
            acc[calificacion.semestre].push(calificacion);
            return acc;
        }, {});

        // Calculate promedio
        if (numCalificaciones > 0) {
            promedio = (totalCalificaciones / numCalificaciones).toFixed(2);
        }
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return (
        <div>
            <p>
                Boleta: {session.matricula}
            </p>
            <p>
                Nombre: {session.nombre}
            </p>
            <p>
                Promedio: {promedio}
            </p>
            {Object.entries(calificaciones).map(([semestre, calificaciones]) => (
                <table key={semestre} className="table" border="1">
                    <tbody>
                        <tr>
                            <th colSpan={3}>Semestre {semestre}</th>
                        </tr>
                        <tr>
                            <th>Clave</th>
                            <th>Materia</th>
                            <th>Calificacion</th>
                        </tr>
                        {calificaciones.map((calificacion, index) => (
                            <tr key={index}>
                                <td>{calificacion.grupoID}</td>
                                <td>{calificacion.materiaNombre}</td>
                                <td>{calificacion.final}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ))}
        </div>
    )
}
