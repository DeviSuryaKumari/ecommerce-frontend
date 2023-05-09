import { toast } from "react-toastify";
import { UserContext, UserDispatchContext } from "./providers/UserProvider";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoleBasedNavLinks from "./RoleBasedNavLinks";

const UserNavigation = () => {
    const userContext = useContext(UserContext);
    const userDispatch = useContext(UserDispatchContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        let response = await fetch("http://ecommerce-app036.wl.r.appspot.com/api/users/logout/" + userContext.userId, {
            method: 'PUT',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            },
        });
        response = await response.text();
        if (response === 'Logout successful!') {
            toast.success("User logged out Successfully!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/");
            userDispatch({
                type: 'LOGOUT_USER'
            });
        } else {
            toast.error("Logout failed!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (<>
        {
            userContext.isLoggedIn ?
                <>
                    <RoleBasedNavLinks />
                    <li className="header-link-list__item nav-item">
                        <Link to="/" onClick={handleLogout} className="nav-link active">
                            <b className="text-primary">Logout</b>
                        </Link>
                    </li>
                </> :
                <>
                    <li className="header-link-list__item nav-item">
                        <Link to="/register" className="nav-link active">
                            <b className="text-primary">Register</b>
                        </Link>
                    </li>
                    <li className="header-link-list__item nav-item">
                        <Link to="/login" className="nav-link active">
                            <b className="text-primary">Login</b>
                        </Link>
                    </li>
                </>
        }
    </>)
}

export default UserNavigation;