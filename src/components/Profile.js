import React, { useState, useEffect } from 'react';
import { API_URL } from './constants';
import { useNavigate } from 'react-router-dom';

function Profile() {
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

    const onLogOut = (e) => {
        fetch(`${API_URL}/user/logOutUser`, {
            method: "post",
            credentials: 'include'
        }).then(async res => {
            if (res.ok) {
                setAuthorize(false);
                setUsername("");
            } else {
                throw new Error('Logout failed');
            }
        }).catch(error => {
            console.error(error);
        })
        navigate("/");
    }

    return (
        <div className="d-flex justify-content-center ">
            { authorize ? 
                <div >
                    <h1 >Welcome {username}</h1>
                    <h2 >This is issues assigned to you:</h2>
                    <div>
                        {/* List of issues */}
                    </div>
                    <button onClick={onLogOut}> Log Out </button>
                </div>
                : <div>Log in to see your profile</div>
            }
        </div>
    )
}

export default Profile;