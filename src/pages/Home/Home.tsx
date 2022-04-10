import React from 'react';
import logo from '../../logo.svg';
import './Home.css';
import {Link, Outlet} from "react-router-dom";
import {Button, Col, Container, Navbar, Row} from "react-bootstrap"
import NavBar from "../../components/NavBar";
import navisImageSrc from '../../navis.png';
import Image from 'react-bootstrap/Image'
function Home() {
  return (
      <div>
          <NavBar/>
          <Container>
              <Row>
                  <Col align="center" className="mt-5">
                      <Image  style={{height:"300px", width:"auto", margin:"0 auto"}} src={navisImageSrc}/>
                  </Col>
              </Row>
              <Row>
                  <h1 style={{textAlign:"center"}}>Follow Nivens into the Rabbit Hole</h1>
              </Row>
              <Row>
                  <h5 style={{textAlign:"center"}}>Find collections that your peers love! </h5>
              </Row>
              <Row>
                  <Col align={"center"} className={"mt-5"}>
                      <Link to="/explorer">
                          <Button variant="primary" style={{border: "1px solid #F8F9FA",
                              boxSizing: "border-box",
                              borderRadius: "4px"}}>EXPLORE</Button>
                      </Link>
                  </Col>
              </Row>
          </Container>
      </div>
  );
}

export default Home;
