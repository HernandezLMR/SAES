import Link from "next/link"

export default function materias(){
    return (
            <div>
                <h1>
                    Esta es la pagina de materias
                </h1>
                <p>
                    Aqui podras encontrar las materias asignadas al usuario activo
                </p>
                <table class="table" border="1">
                    <tbody>
                        <tr>
                            <th> Grupo </th>
                            <th> Materia </th>
                        </tr>
                        <tr>
                            {/*<Link href="/teacher/asignar_calificaciones">*/}
                            
                            <td> 1 </td>
                            {/*</Link>*/}
                            <td> Matematicas </td>
                            
                            
                            
                        </tr>
                    </tbody>
                </table>

            </div>
    )
 }
