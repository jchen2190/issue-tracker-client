import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function NavHeader(props) {
    const user = {
        username: props.username,
        authorize: props.authorize,
    }
    const navigate = useNavigate();

    function GoToProfile(e) {
        e.preventDefault();
        navigate("/profile");
    }

    function SignIn(e) {
        e.preventDefault();
        navigate("/login");
    }

    return (
        <div className="navheader">
            <Navbar>
                <Container>
                    <div className="brand"><a className="btn" href="/">IssueTracker</a></div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" className="d-md-block d-lg-none">Home</Nav.Link>
                            <Nav.Link href="/tasklist" className="d-md-block d-lg-none">Issues</Nav.Link>
                        </Nav>
                        <Navbar.Text>
                            <div className="is-user">
                                {
                                    user.authorize ?
                                    <button className="btn" onClick={GoToProfile}>Welcome {user.username}</button>
                                    :
                                    <button className="btn" onClick={SignIn}>Sign In</button>
                                }
                            </div>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavHeader;