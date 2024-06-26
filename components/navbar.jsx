import LogoutForm from "./html/logoutForm";
import { getSession } from "./actions";
import styles from "./login.module.css"

const Navbar = async () => {
  const session = await getSession();

  console.log(session);
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div>
          <img
            src="https://www.mexicodesconocido.com.mx/wp-content/uploads/2019/07/IPN_Rodrigo_OSegueda.jpg"
            alt="Logo del Instituto Politécnico Nacional"
          />
          
        </div>
        <div>
            <h1>Instituto Politécnico Nacional</h1>
            <p>"La Técnica al Servicio de la Patria"</p>
          </div>
        <div>
            {!session.isLoggedIn && (
          <h2>
            Plataforma de Administración e <br /> Integración de Gestión Académica
          </h2>
            )}
        </div>
        <div className={styles.centered}>
          {session.isLoggedIn && (
            <div>
              <LogoutForm />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
