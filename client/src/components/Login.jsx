import { useState } from 'react'

const Login = () => {

    const URL = "http://localhost:8002"

    const [values, setValues] = useState({  email: "", password: "" })
    const [success, setSuccess] = useState(false)

    const loginUser = async (userData) => {
        const response = await fetch(`${URL}/user/signin`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()
    
        return data
    }

    const handleChange = (e) => {
        const inputValue = e.target.value
        const inputName = e.target.name

        setValues((val) => ({ ...val, [inputName]: inputValue }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        loginUser(values).then(()=>setSuccess(true))

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