import React, { useContext } from 'react';
import AuthContext from "../AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import githubLogo from '../images/github.svg';

function NavHeader() {
    const { authorize, user } = useContext(AuthContext);
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
                    <div className="brand"><Link to="/">IssueTracker</Link><Link to="https://github.com/jchen2190/issue-tracker-client"><img src={githubLogo} alt="github logo" /></Link></div>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/" className="d-md-block d-lg-none mx-3">Home</Link>
                            <Link to="/tasklist" className="d-md-block d-lg-none mx-3">Issues</Link>
                        </Nav>
                        <Navbar.Text>
                            <div className="is-user">
                                {
                                    authorize ?
                                    <button className="btn" onClick={GoToProfile}>Welcome {user}</button>
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