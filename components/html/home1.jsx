import Home from "../buttons/home1.jsx"
import Calif from "../buttons/calificaciones.jsx"
import Kardex from "../buttons/kardex.jsx"
import SGrupos from "../buttons/s_grupos.jsx"
import styles from "../home_styles.module.css"


export default function Shome(){
    return (
            <div className={styles.buttons}>
                <Home/>
                <Calif/>
                <Kardex/>
                <SGrupos/>
            </div>
    )
 }
