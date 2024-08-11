import React from "react";
import {Link} from "react-router-dom"
const Navbar = () => {
    return (
        <nav style={navbarStyle}>
            <div style={brandStyle}>
                My Todo App
            </div>
            <ul style={navListStyle}>
                <Link to="/" style={navLinkStyle}>
                    <li style={navItemStyle}>Home</li>
                </Link>
                <Link to="/action" style={navLinkStyle}>
                    <li style={navItemStyle}>Action</li>
                </Link>
            </ul>
        </nav>
    );
};

const navbarStyle = {
    backgroundColor: "#3f51b5",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: "0",
    zIndex: "1000",
  };
  
  const brandStyle = {
    color: "#fff",
    fontWeight: 600,
    fontSize: "24px",
    textDecoration: "none",
  };
  
  const navListStyle = {
    listStyleType: "none",
    margin: "0",
    padding: "0",
    display: "flex",
  };
  
  const navItemStyle = {
    marginRight: "10px",
    border: "1px solid gray",
    borderRadius: "10%",
    padding: "5px"
  };
  
  const navLinkStyle = {
    color: "#fff",
    fontWeight: 600,
    padding: "0 5px",
    textDecoration: "none",
  };

  export default Navbar;