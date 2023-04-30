import { Routes, Route} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Home from './Home';
import Tasklist from "./components/Tasklist";
import OneTask from './components/OneTask';
import AddTask from './components/AddTask';
import NotFound from './NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar >
                <Container>
                    <Navbar.Brand>Issue Tracker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/tasks">Tasks</Nav.Link>
                        </Nav>
                        <Navbar.Text>
                            Signed in as: <a href="/login">John Doe</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/tasks" element={ <Tasklist /> } >
                    <Route path=":id" element={ <OneTask /> } />
                    <Route path="new" element= { <AddTask /> } />
                </Route>
                <Route path="*" element={ <NotFound /> } />
            </Routes>
        </div>
    );
}

export default App;