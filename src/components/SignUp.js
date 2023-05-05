import React, { useState } from 'react';
import { API_URL } from '../constants';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

function SignUp () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function createUser() {
        // try {
        //     const res = await axios.post(`${API_URL}/user/createUser`, {
        //         username: username,
        //         password: password
        //     })
        //     console.log(res.data);
        // } catch (error) {
        //     console.log(error);
        // }
        
        
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
                    // navigate("/login");
                }
            })
            .catch(error => console.error(error));
    }

    function handleSubmit(e) {
        e.preventDefault();
        createUser();
    }

    function handleClick() {
        navigate("/login")
    }

    return (
        <div className="signup-form d-flex container justify-content-center align-items-center">
            <form onSubmit={handleSubmit}>
                <h3 className="d-flex justify-content-center">IssueTracker</h3>
                <p className="d-flex justify-content-center">Register</p>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input value={username} type="text" name="username" className="form-control" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password</label>
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
                    <p className="m-0">Already have an account?</p>
                    <button className="btn btn-outline-primary" onClick={handleClick}>Login here.</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;