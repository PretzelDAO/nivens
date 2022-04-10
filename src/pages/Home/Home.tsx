import React from 'react';
import logo from '../../logo.svg';
import './Home.css';
import {Link, Outlet} from "react-router-dom";
import {Button, Container, Navbar} from "react-bootstrap"
import NavBar from "../../components/NavBar";

function Home() {
  return (
      <div>
          <NavBar/>
        <h1>Homepage</h1>
          <nav
            style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem",
            }}
        >
          <Link to="/explorer">
              <Button variant="primary">Jump in</Button>
          </Link>
        </nav>
        <Outlet />
      </div>
  );
}

export default Home;
