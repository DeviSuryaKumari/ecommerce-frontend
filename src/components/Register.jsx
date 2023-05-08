import './register.scss';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { initialUser } from "./providers/UserProvider";

const Register = () => {
    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();

    const handleUserInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const saveUser = async (event) => {
        event.preventDefault();

        let response = await fetch("http://localhost:8080/api/users/register", {
            method: 'POST',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        response = await response.text();
        if (response === 'User successfully registered!') {
            toast.success("Registered Successfully!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/");
            setUser(initialUser);
        } else {
            toast.error("Registration failed!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div>
            <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
                <div
                    className="card form-card border-color text-primary custom-bg"
                >
                    <div className="card-header bg-color custom-bg-text text-center">
                        <h5 className="card-title">Add User</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveUser}>
                            <div className="mb-3 text-primary">
                                <label htmlFor="title" className="form-label">
                                    <b> Name</b>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    onChange={handleUserInput}
                                    value={user.name}
                                />
                            </div>
                            <div className="mb-3 text-primary">
                                <label htmlFor="title" className="form-label">
                                    <b> User Name</b>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    required={true}
                                    onChange={handleUserInput}
                                    value={user.username}
                                />
                            </div>
                            <div className="mb-3 text-primary">
                                <b>
                                    <label className="form-label">Email Id</label>
                                </b>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    required={true}
                                    onChange={handleUserInput}
                                    value={user.email}
                                />
                            </div>
                            <div className="mb-3 text-primary">
                                <b><label htmlFor="password" className="form-label">
                                    Password
                                </label></b>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    required={true}
                                    onChange={handleUserInput}
                                    value={user.password}
                                />
                            </div>
                            <div className="mb-3 text-primary">
                                <label htmlFor="role" className="form-label">
                                    <b>User Role</b>
                                </label>
                                <select
                                    required={true}
                                    onChange={handleUserInput}
                                    className="form-control"
                                    id="role"
                                    name="role"
                                >
                                    <option value=''>Select Role</option>
                                    <option value="SELLER"> Seller </option>
                                    <option value="CUSTOMER"> Customer </option>
                                </select>
                            </div>
                            <input
                                type="submit"
                                className="btn bg-color custom-bg-text"
                                value="Register"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
