import React from "react";
import "./Nav.css";

const Nav = () => (
    <ul className="nav nav-pills justify-content-center" id="nav-menu-links">
        <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/api/articles/saved">Saved Threads</a>
        </li>
        <li className="nav-item">
            <a className="nav-link active" id="scrape">Scrape MH Reddit</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" id="deleteall">Delete All Threads</a>
        </li>
    </ul>
);

export default Nav;
