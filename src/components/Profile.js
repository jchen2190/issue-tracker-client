import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from './constants';

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
    }, [authorize]);

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
        navigate(0);
    }

    return (
        <div className="d-flex justify-content-center ">
            { authorize ? 
                <div >
                    <h1 >Welcome {username}</h1>
                    {/* <h2 >This is issues assigned to you:</h2> */}
                    <div>
                        {/* List of issues */}
                    </div>
                    <button onClick={onLogOut} className="btn btn-outline-primary"> Log Out </button>
                </div>
                : <h4 className="mt-5"><Link to="/login">Log in</Link> to see your profile</h4>
            }
        </div>
    )
}

export default Profile;