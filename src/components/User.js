import React, { useState, useEffect } from 'react';
import { API_URL } from '../constants';

function User() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                // TODO: get token or cookie from session
                // const token = window.localStorage.getItem('token');

                const response = await fetch(`${API_URL}/user/userData`, {
                    method: 'post',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        // "Cookie": `connect.sid=${cookie}`
                    },
                    // body: JSON.stringify({
                    //     token
                    // }),
                });

                const responseData = await response.json();
                console.log(responseData);

                if (responseData.error) {
                    setMessage(responseData.error);
                } else {
                    setUsername(responseData.payload.username)
                    setMessage(responseData.message);
                }
            } catch (error) {
                console.error(error);
            }
        }

    fetchData();
    }, []);

    return (
        <div>
            <h1>Welcome {username}</h1>
            {message}
        </div>
    )
}

export default User;