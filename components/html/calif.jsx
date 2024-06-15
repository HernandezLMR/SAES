"use server"
import {getSession} from "../actions"
import DB from "../database"

export default async function Calificacion(){
    const session = await getSession();
    const client = await DB();
    const connection = client.db('SAES');
    let calificaciones = [];

    try {
        const userDB = await connection.collection("Calificaciones");
        const matricula = session.matricula;
        const result = await userDB.find({ "estudianteID": matricula, "completed": false }).toArray();
        calificaciones = result; // Store the results in the calificaciones variable
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
            <table className="table" border="1">
                <thead>
                    <tr>
                        <th>Grupo</th>
                        <th>Materia</th>
                        <th>1er Parcial</th>
                        <th>2do Parcial</th>
                        <th>3er Parcial</th>
                        <th>Final</th>
                    </tr>
                </thead>
                <tbody>
                    {calificaciones.map((calificacion, index) => (
                        <tr key={index}>
                            <td>{calificacion.grupoID}</td>
                            <td>{calificacion.materiaNombre}</td>
                            <td>{calificacion.parcial1}</td>
                            <td>{calificacion.parcial2}</td>
                            <td>{calificacion.parcial3}</td>
                            <td>{calificacion.final}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
