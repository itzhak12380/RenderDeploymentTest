import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { userRegister } from '../../service/userService'
function Register() {
    const [user, setuser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const onChnageInput = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setuser({ ...user, [name]: value })
    }
    const registerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
            const res = await userRegister(user)
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('firstLogin', "true")
            window.location.href = "/";
    }
    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register </h2>
                <input type='email' name="email" required placeholder="Email" value={user.email} onChange={onChnageInput} />
                <input type='text' name="name" required placeholder="name" value={user.name} onChange={onChnageInput} />
                <input type='password' name="password" required placeholder="password" autoComplete="on" value={user.password} onChange={onChnageInput} />
                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
