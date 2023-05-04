import React, { useState } from 'react';
import { API_URL } from '../constants';
import { useNavigate } from 'react-router-dom';

function SignUp () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

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
        }).then(async res => res.json())
            .then(data => {
                if (data.error) {
                    setMessage(data.error);
                } else {
                    setMessage(data.message);
                }
            })
            .catch(error => console.error(error));
    }

    function handleSubmit(e) {
        e.preventDefault();
        postUser();
    }

    function handleClick() {
        navigate("/login")
    }

    return (
        <div className="auth-form-container">
            <h3>Sign Up</h3>
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
                {message && <div>{message}</div>}
            </form>
            <button onClick={handleClick}>Already have an account? Login here.</button>
        </div>
    )
}

export default SignUp;