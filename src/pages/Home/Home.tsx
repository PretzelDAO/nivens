import React from 'react';
import logo from '../../logo.svg';
import './Home.css';
import {Link, Outlet} from "react-router-dom";
import {Button, Col, Container, Navbar, Row} from "react-bootstrap"
import NavBar from "../../components/NavBar";
import navisImageSrc from '../../navis.png';
import navisSecondImageSrc from '../../navis2.png';
import pDaoSrc from '../../pDao.png';

import placeHolderSrc from '../../homePlaceholder.png';

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
                  <Col align={"center"} className={"mt-1"}>
                      <Link to="/explorer">
                          <Button variant="primary" style={{border: "1px solid #F8F9FA",
                              boxSizing: "border-box",
                              borderRadius: "4px"}}>EXPLORE</Button>
                      </Link>
                  </Col>
              </Row>
              <Row>
                  <Col align="center" className="mt-5">
                      <Image  style={{height:"300px", width:"auto", margin:"0 auto"}} src={placeHolderSrc}/>
                  </Col>
              </Row>
              <Row className="justify-content-md-center mt-2">
                  <Col className={"col-5"}>
                    <h6 style={{textAlign:"center"}}> We provide your personal entry point into the rabbithole! By analyzing the web3 activity of your Twitter network and your personal wallet we spot the perfect communities and collections for you. You will be able to detect new trending collections in your network faster than ever before. Stay tuned for whats coming and follow us down the rabbithole.</h6>
                  </Col>
                  </Row>
              <Row>
                  <Col align="center" className="mt-5" >
                      <Image  style={{height:"300px", width:"auto", margin:"0 auto"}} src={navisSecondImageSrc}/>
                  </Col>
                  <Col align="center" className="mt-5">
                      <Row className={"mt-5 justify-content-md-center"}>
                            <h2 style={{textAlign:"center"}}>Hello, I am Nivens!</h2>
                      </Row>
                      <Row className={"mt-5 justify-content-md-center"}>
                          <Col className={"col-10"}>
                              <h6 style={{textAlign:"center", verticalAlign:"center"}}>NFTs are about community. We believe everyone should be able to find the community one belongs. This can be quite overwhelming. But you are not alone. We are a group of NFT enthusiasts helping you to find the collections and communities unique to your interests. We are like Nivens, the white rabbit, leading Alice into the Rabbithole in Alice in Wonderland - follow us and connect Twitter and Metamask to get started! </h6>
                          </Col>

                      </Row>
                  </Col>
              </Row>
              <Row className="mt-5">
                  <Col align="center" className={"px-2"} >
                      <p style={{textAlign:"right"}}>Powered by</p>
                  </Col>
                  <Col className={"p-0"}>
                      <Image   style={{height:"auto", width:"35px", marginLeft:"0", paddingLeft:"0"}} src={pDaoSrc}/>
                  </Col>
              </Row>
          </Container>
      </div>
  );
}

export default Home;
