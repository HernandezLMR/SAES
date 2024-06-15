export default function Kardex(){
    return (
            <div>
                <p>
                    Boleta: 2022710195
                </p>
                <p>
                    Nombre: Aldo Yael Hernandez Flores
                </p>
                <p>
                    Promedio: 10
                </p>
                <table className="table" border="1">
                    <tbody>
                        <tr>
                        <th colSpan={3}>Primer Semestre</th>
                        </tr>
                                <tr>
                                    <th> Clave </th>
                                    <th> Materia </th>
                                    <th> Calificacion </th>
                                </tr>
                                <tr>
                                    <td> 1 </td>
                                    <td> Matematicas </td>
                                    <td> 10 </td>
                                </tr>
                    </tbody>
                </table>
            </div>
    )
 }