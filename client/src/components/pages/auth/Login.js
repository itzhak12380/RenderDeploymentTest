import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import { userLogin } from '../../service/userService'
function Login() {
    const [user, setuser] = useState({
        email: "",
        password: ""
    })
    const [isFaild, setisFaild] = useState(false)
    const onChnageInput = (e) => {
        const { name, value } = e.target
        setuser({ ...user, [name]: value })
    }
    const loginSubmit = async e => {
        e.preventDefault() 
        try {

            const token = await userLogin(user)
            if (token.accessToken) {
                localStorage.setItem('accessToken', token.accessToken)
                localStorage.setItem('firstLogin', true)
                window.location.href = "/";
            }
            else {
                setisFaild(true);
            }

        } catch (error) {
            alert("falid to contect")
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                {isFaild && <span style={{ color: "orange" }}>email or password is not correct </span>}
                <h2>Login </h2>
                <input type='email' name="email" required placeholder="Email" value={user.email} onChange={onChnageInput} />
                <input type='password' name="password" required placeholder="password" autoComplete="on" value={user.password} onChange={onChnageInput} />
                <div className="row">
                    <button type="submite">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
