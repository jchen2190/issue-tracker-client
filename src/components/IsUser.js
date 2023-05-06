import React, { useState, useEffect } from 'react';
import { API_URL } from '../constants';
import { useNavigate } from 'react-router-dom';

function IsUser() {
    const [username, setUsername] = useState("");
    const [authorize, setAuthorize] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${API_URL}/user/userData`, {
                    method: 'post',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true"
                    },
                    credentials: 'include' // enable cookies
                });

                const responseData = await response.json();

                if (responseData.error) {
                    setAuthorize(false);
                    console.log(responseData.message);
                } else {
                    setUsername(responseData.payload.username)
                    setAuthorize(true);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    function GoToProfile(e) {
        e.preventDefault();
        navigate("/profile");
    }

    function SignIn(e) {
        e.preventDefault();
        navigate("/login");
    }


    return (
        <div className="is-user">
            {
                authorize ?
                <button onClick={GoToProfile}>Welcome {username}</button>
                :
                <button onClick={SignIn}>Sign In</button>
            }
        </div>
    );
}

export default IsUser;