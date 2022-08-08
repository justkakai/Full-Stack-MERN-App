import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) navigate("/login")
        else {
            /* axios.get(`${process.env.REACT_APP_BASE_URL}/auth/validation`, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`                
                }
            })
                .then(res => setUser(res.data.user))
                .catch(err => console.log(err))
            */
        }
    }, [])

    return (
        <div>
            Dashboard
            <h2>
                Welcome: {user ? user.username : "No response received"}
                email: {user ? user.email : ""}
                MongoId: {user ? user._id : ""}
            </h2>
        </div>
    )
}

export default Dashboard;