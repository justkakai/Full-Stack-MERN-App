import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [values, setValues] = useState({ email: "", password: "" })
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate();

    const loginUser = async (userData) => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/signin`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()
        //console.log(data.token);
        if (response.statusText === 'OK') {
            localStorage.setItem("accessToken", data.token);
            navigate("/home");
        };

        return data;
    }

    const handleChange = (e) => {
        const inputValue = e.target.value
        const inputName = e.target.name

        setValues((val) => ({ ...val, [inputName]: inputValue }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        loginUser(values).then(() => setSuccess(true))

    }

    return (
        <>
            <form>
                <input value={values.email} onChange={handleChange} name="email" type='email' placeholder="Email" />
                <input value={values.password} onChange={handleChange} name="password" type='password' placeholder="Password" />
                <button onClick={handleSubmit}>Login</button>
            </form>
            {success ? <p>Successfully logged in!</p> : null}
        </>

    )
}

export default Login