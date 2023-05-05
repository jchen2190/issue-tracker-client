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
                    }, 1000)
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
        <div className="login-form d-flex container justify-content-center align-items-center">
            <form onSubmit={handleSubmit}>
                <h3 className="d-flex justify-content-center">IssueTracker</h3>
                <p className="d-flex justify-content-center">Please login to your account</p>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input value={username} type="text" name="username" className="form-control" onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input value={password} type="password" name="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                {
                    success ? message : <button type="submit" className="btn btn-primary btn-lg w-100 mb-4">Log In</button>
                }
                {
                    error ? message : <></>
                }
                <div className="d-flex justify-content-center align-items-center">
                    <p className="m-0">Don't have an account?</p>
                    <button className="btn btn-outline-primary" onClick={handleClick}>Register</button>
                </div>
            </form>
        </div>
    );
}

export default LogIn;