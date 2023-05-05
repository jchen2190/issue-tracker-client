import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import User from './components/User';
import UserContext from './components/UserContext';
import Home from './Home';
import Tasklist from "./components/Tasklist";
import OneTask from './components/OneTask';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import LogOut from './components/LogOut';
import NotFound from './NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <div>
            <Navbar >
                <Container>
                    <Navbar.Brand>IssueTracker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/tasklist">Tasks</Nav.Link>
                        </Nav>
                        <Navbar.Text>
                            <UserContext />
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/tasklist" element={ <Tasklist /> } />
                <Route path="/tasklist/:id" element={ <OneTask /> } />
                <Route path="/login" element={ <LogIn /> } />
                <Route path="/signup" element = { <SignUp /> } />
                <Route path="/user" element={ <User /> } />
                <Route path="/logout" element= { <LogOut /> } />
                <Route path="*" element={ <NotFound /> } />
            </Routes>
        </div>
    );
}

export default App;