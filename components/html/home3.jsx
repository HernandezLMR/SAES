import Home from "../buttons/home3.jsx"
import Grupos from "../buttons/ad_grupos.jsx"
import Usuarios from "../buttons/ad_usuarios.jsx"
import Materias from "../buttons/ad_materias.jsx"
import Periodos from "../buttons/ad_periodo.jsx"
import styles from "../home_styles.module.css"


export default function Ahome(){
    return (
            <div className={styles.buttons}>
                <Home/>
                <Grupos/>
                <Usuarios/>
                <Materias/>
                <Periodos/>
            </div>
    )
 }
