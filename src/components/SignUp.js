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
        <div className="signup-form">
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
                {
                    success && <p style={{color:'green'}}>{success}</p>
                }
                {
                    error && <p style={{color:'red'}}>{error}</p>
                }
                <label htmlFor="username">Username</label>
                <input value={username} type="text" name="username" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input value={password} type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Sign Up</button>
            </form>
            <br />
            <button onClick={handleClick}>Already have an account? Login here.</button>
        </div>
    )
}

export default SignUp;