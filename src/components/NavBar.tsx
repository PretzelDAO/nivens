import React, {useState} from 'react';
import logo from './../img.png';
import {Link, Outlet, useNavigate } from "react-router-dom";
import {Button, Container, Modal, Nav, Navbar} from "react-bootstrap"
import { useMetaMask } from "metamask-react";
import './NavBar.css'

function NavBar() {
    const { status, connect, account, chainId, ethereum } = useMetaMask();
    const [showTwitterModal, setShowTwitterModal] = useState(false)
    const handleClose = () => setShowTwitterModal(false);
    const handleShow = () => setShowTwitterModal(true);
    let navigate = useNavigate();

    const twitterStatus="notConnected"
    return (
        <Navbar bg="primary" color={"1D1948"}>
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
                    {     (status === "notConnected")?  <Button className="Gradient-Button" onClick={()=>connect().then(()=>navigate("/explorergig"))}>Connect to MetaMask</Button>:<Button className="Gradient-Button">Metamask Connected</Button>}
                    {     (twitterStatus === "notConnected")?  <Button className="Gradient-Button" onClick={handleShow}>Connect to Twitter</Button>:<Button className="Gradient-Button">Twitter Connected</Button>}
                    <Link to="/explorer">
                        <Button variant="primary" style={{border: "1px solid #F8F9FA",
                            boxSizing: "border-box",
                            borderRadius: "4px",
                        marginInline:"5px"}}>EXPLORE</Button>
                    </Link>
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
