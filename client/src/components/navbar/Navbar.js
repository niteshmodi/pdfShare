import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

const Navbar = ({ user }) => {
    return (
        <nav className='navbar'>
            
            {!user && (
                <>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/register'>Register</NavLink>
                </>
            )}
            {user && (
                <>
                     <NavLink to='/'>Home</NavLink>
                    <NavLink to='/profile'>Your Uploads</NavLink>
                    <NavLink to='/logout'>Logout</NavLink>
                </>
            )}
        </nav>
    );
};

export default Navbar;
