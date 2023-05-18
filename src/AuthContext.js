import { createContext, useState, useEffect } from 'react';
import { API_URL } from './components/constants';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [authorize, setAuthorize] = useState(false);
    const [username, setUsername] = useState("");

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
                } else {
                    setUsername(responseData.payload.username)
                    setAuthorize(true);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [username, authorize]);

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
        <AuthContext.Provider value={{ authorize, username, onLogOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;