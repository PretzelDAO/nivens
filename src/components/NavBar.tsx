import React from 'react';
import logo from './../logo.svg';
import {Link, Outlet} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap"

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#/">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Nivens
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#/">Home</Nav.Link>
                    <Nav.Link href="#/explorer">Explorer</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
