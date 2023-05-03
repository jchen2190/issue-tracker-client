import React, { useState } from 'react';
import { API_URL } from '../constants';
import axios from 'axios';

function LogIn(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/user/logInUser`, {
                username: username,
                password: password
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="auth-form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input value={username} type="text" name="username" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input value={password} type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Log In</button>
            </form>
            <button onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    );
}

export default LogIn;