import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import profileIcon from '../images/person.svg';
import homeIcon from '../images/home2.svg';
import taskIcon from '../images/layers-two.svg';

function NavSidebar() {
    return (
      <Navbar>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="flex-column my-3">
              <span className="m-3">Navigation</span>
              <li className="d-flex mx-4">
                <img src={homeIcon} alt="home" />
                <Nav.Link href="/">Home</Nav.Link>
              </li>
              <li className="d-flex mx-4">
                <img src={taskIcon} alt="issues" />
                <Nav.Link href="/tasklist">Issues</Nav.Link>
              </li>
              <span className="m-3">Account</span>
              <li className="d-flex mx-4">
                <img src={profileIcon} alt="profile"/>
                <Nav.Link href="/profile">Profile</Nav.Link>
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

export default NavSidebar;