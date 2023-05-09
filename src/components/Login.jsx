import { useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserDispatchContext } from "./providers/UserProvider";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useContext(UserDispatchContext);
    const [loginRequest, setLoginRequest] = useState({
        username: "",
        password: "",
        role: "",
    });

    const handleUserInput = (e) => {
        setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
    };

    const loginAction = (e) => {
        e.preventDefault();
        fetch("http://ecommerce-app036.wl.r.appspot.com/api/users/login", {
            method: "POST",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: loginRequest.username,
                password: loginRequest.password,
                role: loginRequest.role,
            }),
        }).then((response) => {
            if (response.ok) {
                response.json().then((result) => {
                    toast.success("Login successful!", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    navigate("/");
                    dispatch({
                        type: 'LOGIN_USER',
                        payload: { user: result }
                    })
                })
            } else {
                toast.error("Login failed!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });
    };

    return (
        <div>
            <div className="mt-2 d-flex aligns-items-center justify-content-center">
                <div
                    className="card form-card border-color custom-bg"
                >
                    <div className="card-header bg-color text-center custom-bg-text">
                        <h4 className="card-title">User Login</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={loginAction}>
                            <div className="mb-3 text-color">
                                <label htmlFor="role" className="form-label">
                                    <b>User Role</b>
                                </label>
                                <select
                                    required={true}
                                    onChange={handleUserInput}
                                    className="form-control"
                                    name="role"
                                >
                                    <option value="">Select Role</option>
                                    <option value="SELLER"> Seller </option>
                                    <option value="CUSTOMER"> Customer </option>

                                </select>
                            </div>

                            <div className="mb-3 text-color">
                                <label htmlFor="username" className="form-label">
                                    <b>User Name</b>
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    onChange={handleUserInput}
                                    value={loginRequest.username}
                                />
                            </div>
                            <div className="mb-3 text-color">
                                <label htmlFor="password" className="form-label">
                                    <b>Password</b>
                                </label>
                                <input
                                    required
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    onChange={handleUserInput}
                                    value={loginRequest.password}
                                    autoComplete="on"
                                />
                            </div>
                            <input
                                type="submit"
                                className="btn bg-color custom-bg-text"
                                value="Login"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
