import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./Home";
import About from "./About";

const NewTab = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
};

export default NewTab;
