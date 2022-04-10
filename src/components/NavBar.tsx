import React from 'react';
import logo from './../img.png';
import {Link, Outlet} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap"
import { useMetaMask } from "metamask-react";

function NavBar() {
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    return (
        <Navbar bg="primary" color={"1D1948"} >
            <Container>
                <Navbar.Brand href="#/">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                <Nav  className="justify-content-end">
                    {     (status === "notConnected")?  <Button onClick={connect}>Connect to MetaMask</Button>:<Button onClick={connect}>Connected</Button>}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
