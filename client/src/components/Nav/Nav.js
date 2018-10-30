import React from "react";
import "./Nav.css";

const Nav = props => (
    <ul className="nav nav-pills justify-content-center" id="nav-menu-links">
        <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/saved">Saved Threads</a>
        </li>
        <li className="nav-item">
            <a className="nav-link active" id="scrape" onClick={() => props.scrapeMHSubReddit()}>Scrape MH Reddit</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" id="deleteall" onClick={() => props.deleteAllArticles()}>Delete All Threads</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="https://github.com/teknoma104/react-mongoscraper" target="_blank" rel="noopener noreferrer">GitHub Link</a>
        </li>
    </ul>
);

export default Nav;
