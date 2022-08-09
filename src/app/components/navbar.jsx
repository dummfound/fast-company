import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <ul className="d-flex gap-3 list-unstyled mx-3">
            <li>
                <Link to="/" className="text-decoration-none">Main</Link>
            </li>
            <li>
                <Link to="/login" className="text-decoration-none">Login</Link>
            </li>
            <li>
                <Link to="/users" className="text-decoration-none">Users</Link>
            </li>
        </ul>
    );
};

export default Navbar;
