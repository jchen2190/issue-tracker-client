import { createContext, useState, useEffect } from 'react';
import { API_URL } from './components/constants';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [authorize, setAuthorize] = useState(false);
    const [user, setUser] = useState("guest");
    const [loginError, setLoginError] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");

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
                    setUser(responseData.payload.username)
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
                setUser("guest");
                setLoginMessage("");
            } else {
                throw new Error('Logout failed');
            }
        }).catch(error => {
            console.error(error);
        })
    }

    async function logInUser(username, password) {
        let logInUser = {
            username: username,
            password: password,
        }
        fetch(`${API_URL}/user/logInUser`, {
            method: "post",
            body: JSON.stringify(logInUser),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": 'true'
            },
            credentials: 'include' // enable cookies
        }).then(async res => res.json())
            .then(data => {
                if (data.error) {
                    setLoginError(true);
                    setLoginMessage(data.error); // "User not found" or "Invalid Password"
                    console.log(data);
                } else {
                    setLoginError(false);
                    setLoginMessage(data.message); // User logged in successfully
                    setAuthorize(true);
                    setUser(data.payload.username);
                }
            })
            .catch(error => console.error(error));
    }

    return (
        <AuthContext.Provider value={{ authorize, user, onLogOut, logInUser, loginMessage, loginError }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;