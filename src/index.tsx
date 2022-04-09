import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DefaultApp from './pages/DefaultApp/DefaultApp';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route, HashRouter} from "react-router-dom";
import Home from "./pages/Home/Home";
import Explorer from "./pages/Explorer/Explorer";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="explorer" element={<Explorer />} />
        </Routes>
    </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
