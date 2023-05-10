import React, { useState } from 'react';
import { API_URL } from './constants';
import { useNavigate } from 'react-router-dom';

function Profile(props) {
    const [username, setUsername] = useState(props.username);
    const [authorize, setAuthorize] = useState(props.authorize);

    const navigate = useNavigate();

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
                : <h4 className="mt-5"><a href="/login">Log in</a> to see your profile</h4>
            }
        </div>
    )
}

export default Profile;