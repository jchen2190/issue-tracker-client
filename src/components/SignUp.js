import React, { useState } from 'react';
import { API_URL } from './constants';
import { useNavigate } from 'react-router-dom';

function SignUp () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function createUser() {
        if (username.length < 4) {
            setError("Username is too short. 4 characters minimum");
            return;
        }
        if (password.length < 8) {
            setError("Password is too short. 8 characters minimum");
            return;
        }
        
        let newUser = {
            username: username,
            password: password,
        }
        fetch(`${API_URL}/user/createUser`, {
            method: "post",
            body: JSON.stringify(newUser),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(async res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error); // "Username Taken"
                } else {
                    setSuccess(data.message); // "User created successfully"
                    navigate("/login");
                }
            })
            .catch(error => console.error(error));
    }

    function handleSubmit(e) {
        e.preventDefault();
        createUser();
    }

    function handleClick() {
        setSuccess("");
        setError("");
        navigate("/login")
    }

    return (
        <div className="d-flex container justify-content-center align-items-center mt-5">
            <form onSubmit={handleSubmit}>
                <h3 className="d-flex justify-content-center">IssueTracker</h3>
                <p className="d-flex justify-content-center">Register</p>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="username">Username (4 characters minimum)</label>
                    <input value={username} type="text" name="username" className="form-control" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password (8 characters minimum)</label>
                    <input value={password} type="password" name="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100 mb-4">Register</button>
                {
                    success && <p style={{color:'green'}}>{success}</p>
                }
                {
                    error && <p style={{color:'red'}}>{error}</p>
                }
                <div className="d-flex justify-content-center align-items-center">
                    <p className="m-0 p-2">Already have an account?</p>
                    <button className="btn btn-outline-primary" onClick={handleClick}>Login here.</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;