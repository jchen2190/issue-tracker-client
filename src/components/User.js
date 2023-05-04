import React, { useState } from 'react';
import { API_URL } from '../constants';

function User() {
    const [message, setMessage] = useState("");


    fetch(`${API_URL}/user/userData`, {
        method: "post",
        // body: JSON.stringify(payload),
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

    return (
        <div>
            {message}
        </div>
    );
}

export default User;