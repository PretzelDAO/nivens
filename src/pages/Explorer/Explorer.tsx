import React from 'react';
import logo from '../../logo.svg';
import './Explorer.css';
import {Link, Outlet} from "react-router-dom";

function Explorer() {
  return (
      <div>
        <h1>Explorer</h1>
        <nav
            style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem",
            }}
        >
            <div>Placeholder gallery</div>
            <Link to="/">Home</Link> |{" "}
        </nav>
        <Outlet />
      </div>
  );
}

export default Explorer;
