import React, { useState, useEffect } from 'react';
import { API_URL } from '../constants';

function User() {
    const [username, setUsername] = useState("");
    const [authorize, setAuthorize] = useState(false);

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
                        "Access-Control-Allow-Origin": "http://localhost:3030",
                        "Access-Control-Allow-Credentials": true
                    },
                    // body: JSON.stringify({
                    //     token
                    // }),
                });

                const responseData = await response.json();
                console.log(responseData);

                if (responseData.error) {
                    setAuthorize(false);
                    console.log(responseData.message);
                } else {
                    setUsername("Test");
                    // setUsername(responseData.payload.username)
                    console.log(responseData.message);
                    setAuthorize(true);
                }
            } catch (error) {
                console.error(error);
            }
        }

    fetchData();
    }, []);

    return (
        <div>
            { authorize ? 
                <div>
                    <h1>Welcome {username}</h1>
                </div>
                : <div> Log In </div>
            }
        </div>
    )
}

export default User;