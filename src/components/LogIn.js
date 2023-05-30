import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from "../AuthContext";

function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { authorize, logInUser, loginMessage, loginError } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        logInUser(username, password);
    }

    function handleClick(e) {
        e.preventDefault();
        setUsername("");
        setPassword("");
        navigate("/signup");
    }

    return (
        <div className="d-flex container justify-content-center align-items-center mt-5">
            {
                authorize ?
                <div>
                    <h3 className="d-flex justify-content-center">You are logged in!</h3>
                    <p>Go to your <Link to="/profile">profile</Link> or go back <Link to="/">home</Link></p>
                </div>
                :
                <form onSubmit={handleSubmit} autocomplete="off">
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
                    <button type="submit" className="btn btn-primary btn-lg w-100 mb-4">Log In</button>
                    <div className="d-flex justify-content-center align-items-center">
                        <p className="m-0 p-2">Don't have an account?</p>
                        <button className="btn btn-outline-primary" onClick={handleClick}>Register</button>
                    </div>
                    {
                        loginError ? <p>{loginMessage}</p> : <></>
                    }
                </form>
            }
                
        </div>
    );
}

export default LogIn;