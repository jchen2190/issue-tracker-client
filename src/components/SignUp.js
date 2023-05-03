import React, { useState } from 'react';
import { API_URL } from '../constants';

function SignUp (props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function postUser() {
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
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        postUser();
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
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={(() => props.onFormSwitch('login'))}>Already have an account? Login here.</button>
        </div>
    )
}

export default SignUp;