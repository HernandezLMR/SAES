import { logout } from "../actions";

const LogoutForm = () => {
    return (
        <form action={logout}>
            <button>Log Out</button>
        </form>

    )
}

export default LogoutForm;