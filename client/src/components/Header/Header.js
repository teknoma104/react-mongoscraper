import React from "react";
import "./Header.css";

const Header = ({children}) => (
  <div id="header">
    <div id="header-top">
        {children}
    </div>
  </div>
);

export default Header;