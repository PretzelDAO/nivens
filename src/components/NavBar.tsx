import React from 'react';
import logo from './../img.png';
import {Link, Outlet} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap"
import { useMetaMask } from "metamask-react";
import './NavBar.css'

function NavBar() {
    const { status, connect, account, chainId, ethereum } = useMetaMask();
    const twitterStatus="notConnected"
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
                    {     (status === "notConnected")?  <Button className="Gradient-Button" onClick={connect}>Connect to MetaMask</Button>:<Button className="Gradient-Button">Metamask Connected</Button>}
                    {     (twitterStatus === "notConnected")?  <Button className="Gradient-Button" onClick={connect}>Connect to Twitter</Button>:<Button className="Gradient-Button">Twitter Connected</Button>}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
