import React from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";

function NavBar() {

    const navigate = useNavigate();

    const signoutHandler = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    }

    return (
        <>
            <nav>
                <ul style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", listStyle: "none", marginRight: "50px", marginLeft: "50px" }}>

                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/register">Signup</Link>
                    </li>

                    <li>
                        <Link to="/login">Signin</Link>
                    </li>

                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <button onClick={signoutHandler}>Sign out</button>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}

export default NavBar;