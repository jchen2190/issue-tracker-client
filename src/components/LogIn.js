import React, { useState } from 'react';
import { API_URL } from '../constants';
import { useNavigate } from 'react-router-dom';

function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    
    const navigate = useNavigate();

    async function logInUser() {
        let logInUser = {
            username: username,
            password: password,
        }
        fetch(`${API_URL}/user/logInUser`, {
            method: "post",
            body: JSON.stringify(logInUser),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": 'true'
            },
            credentials: 'include' // enable cookies
        }).then(async res => res.json())
            .then(data => {
                if (data.error) {
                    setError(true);
                    setMessage(data.error);
                } else {
                    setError(false);
                    setSuccess(true);
                    setMessage(data.message); // User logged in successfully
                    setTimeout(() => {
                        navigate("/user");
                    }, 2000)
                }
            })
            .catch(error => console.error(error));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        logInUser();
    }

    function handleClick(e) {
        e.preventDefault();
        navigate("/signup");
    }

    return (
        <div className="login-form">
            <h3>Log In</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={username} type="text" name="username" id="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input value={password} type="password" name="password" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                {
                    success ? message : <button type="submit">Log In</button>
                }
                {
                    error ? message : <></>
                }
                
            </form>
            <p>OR</p>
            <button onClick={handleClick}>Don't have an account? Register here.</button>
        </div>
    );
}

export default LogIn;