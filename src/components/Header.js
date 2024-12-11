import React from "react";
import '../css/Header.css'
import {Link} from "react-router-dom";

const Header = () =>{

    return(
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <h1>Team Management System</h1>
                </div>
                <nav className="header-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;