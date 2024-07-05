/*NavBar.js*/
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../wwwroot/css/CustomNavBar.css';

const CustomNavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
            <Navbar.Brand href="/">
                <img
                    src="/images/RNR_Logo.png"
                    alt="TesDMS"
                    className="navbar-logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto navbar-links">
                    <Nav.Link href="#hero-section">Home</Nav.Link>
                    <Nav.Link href="#features-section">Features</Nav.Link>
                    <Nav.Link href="#breakdown-list">Breakdowns</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavBar;

