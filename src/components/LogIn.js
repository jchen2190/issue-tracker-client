import React, { useState } from 'react';
import { API_URL } from '../constants';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    
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
                // "Access-Control-Allow-Origin": "http://localhost:3030",
                // "Access-Control-Allow-Credentials": 'true'
            },
            credentials: 'include' // enable cookies
        }).then(async res => res.json())
            .then(data => {
                if (data.error) {
                    setMessage(data.error);
                } else {
                    setMessage(data.message); // User logged in successfully
                    console.log(data);
                    // TODO: properly save cookie or token after logging in
                    window.localStorage.setItem("token", data.payload);
                    // navigate("/user");
                }
            })
            .catch(error => console.error(error));

        // try {
        //     const response = await axios(`${API_URL}/user/logInUser`, {
        //         method: "post",
        //         body: JSON.stringify(data),
        //         headers: {
        //             "Accept": "application/json",
        //             "Content-Type": "application/json",
        //             "Access-Control-Allow-Origin": "*"
        //         }
        //     });

        //     if (response.data.error) {
        //         setMessage(response.data.error); // "Invalid Password"
        //     } else {
        //         alert("Login Successful");
        //         window.localStorage.setItem("token", response.data);
        //         navigate("/", {state: {id:username}});
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
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
        <div className="auth-form-container">
            <h3>Log In</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input value={username} type="text" name="username" id="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input value={password} type="password" name="password" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                {message && <div>{message}</div>}
                <button type="submit">Log In</button>
            </form>
            <p>OR</p>
            <button onClick={handleClick}>Don't have an account? Register here.</button>
        </div>
    );
}

export default LogIn;