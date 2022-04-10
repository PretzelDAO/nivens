import React, {useState} from 'react';
import logo from './../img.png';
import {Link, Outlet} from "react-router-dom";
import {Button, Container, Modal, Nav, Navbar} from "react-bootstrap"
import { useMetaMask } from "metamask-react";
import './NavBar.css'

function NavBar() {
    const { status, connect, account, chainId, ethereum } = useMetaMask();
    const [showTwitterModal, setShowTwitterModal] = useState(false)
    const handleClose = () => setShowTwitterModal(false);
    const handleShow = () => setShowTwitterModal(true);
    const twitterStatus="notConnected"
    return (
        <Navbar bg="primary" color={"1D1948"} >
            <Container >
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
                    {     (twitterStatus === "notConnected")?  <Button className="Gradient-Button" onClick={handleShow}>Connect to Twitter</Button>:<Button className="Gradient-Button">Twitter Connected</Button>}
                    <Modal show={showTwitterModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{color:"#152536"}}>Almost there</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{color:"#152536"}}>Connection with Twitter is on its way</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
