import React, { useState, useEffect } from 'react';
import { API_URL } from './constants';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function NavHeader() {
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
        <Navbar>
            <Container>
                <Navbar.Brand>IssueTracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/tasklist">Issues</Nav.Link>
                    </Nav>
                    <Navbar.Text>
                        <div className="is-user">
                            {
                                authorize ?
                                <button onClick={GoToProfile}>Welcome {username}</button>
                                :
                                <button onClick={SignIn}>Sign In</button>
                            }
                        </div>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
    );
}

export default NavHeader;