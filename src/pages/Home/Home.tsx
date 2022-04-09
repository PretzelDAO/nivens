import React from 'react';
import logo from '../../logo.svg';
import './Home.css';
import {Link, Outlet} from "react-router-dom";

function Home() {
  return (
      <div>
        <h1>Homepage</h1>
        <nav
            style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem",
            }}
        >
          <Link to="/explorer">Explorer</Link> |{" "}
        </nav>
        <Outlet />
      </div>
  );
}

export default Home;
