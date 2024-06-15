export default function Calif() {
    return(
    <div>
        <p>Grupo: 4IV1</p>
        <p>Materia: Analsis y diseño de sistemas</p>
        <p>Evaluación: Primer parcial</p>
        <p>Fecha límite: 27/06/2024</p>
        <table class="table" border="1">
            <tbody>
                <tr>
                    <th> Matricula </th>
                    <th> Nombre </th>
                    <th> Calificación guardada </th>
                    <th> Calificación </th>
                </tr>
                <tr>
                    <td> 2022710195 </td>
                    <td> Aldo Yael Hernandez Flores </td>
                    <td> 9 </td>
                    <td> 
                        <select id="calificaciones">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}