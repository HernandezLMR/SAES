import Link from "next/link"
import LogoutForm from "./html/logoutForm"
import { getSession } from "./actions"


const Navbar = async () => {
    const session = await getSession()

    console.log(session)
    return (
    <nav> 
        <Link href="/student/home">Student Home</Link>
        <Link href="/teacher/home">Teacher Home</Link>
        <Link href="/">Login</Link>
        {session.isLoggedIn && <LogoutForm/>}
    </nav>
    )
}
export default Navbar