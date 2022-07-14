import { useState } from 'react';

const Registration = () => {

    const URL = "http://localhost:8002"

    const [values, setValues] = useState({ username: "", email: "", password: "", confirmPassword: "" })
    const [success, setSuccess] = useState(false)

    const registerUser = async (userData) => {
        const response = await fetch(`${URL}/user/signup`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()

        return data;
    }

    const handleChange = (e) => {
        const inputValue = e.target.value
        const inputName = e.target.name

        setValues((val) => ({ ...val, [inputName]: inputValue }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        registerUser(values)
            .then(() => setSuccess(true))
    }

    return (
        <>
            <form>
                <input value={values.username} onChange={handleChange} name='username' type='text' placeholder="Username" />
                <input value={values.email} onChange={handleChange} name="email" type='email' placeholder="Email" />
                <input value={values.password} onChange={handleChange} name="password" type='password' placeholder="Password" />
                <input value={values.confirmPassword} onChange={handleChange} name="confirmPassword" type='password' placeholder="Confirm password" />
                <button onClick={handleSubmit}>Register</button>
            </form>
            {success ? <p>Successfully registered!</p> : null}
        </>
    )
}

export default Registration;

