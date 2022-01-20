import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { userRegister } from '../../service/userService'
function Register() {
    const [user, setuser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const onChnageInput = (e) => {
        const { name, value } = e.target
        setuser({ ...user, [name]: value })
    }
    const registerSubmit = async e => {
        e.preventDefault()
        try {
            const res = await userRegister(user)
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('firstLogin', true)
            window.location.href = "/";
        } catch (error) {
            alert(error.responce.data.message)
        }
    }
    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register </h2>
                <input type='email' name="email" required placeholder="Email" value={user.email} onChange={onChnageInput} />
                <input type='text' name="name" required placeholder="name" value={user.name} onChange={onChnageInput} />
                <input type='password' name="password" required placeholder="password" autoComplete="on" value={user.password} onChange={onChnageInput} />
                <div className="row">
                    <button type="submite">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
