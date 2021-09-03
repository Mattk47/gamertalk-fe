import React from 'react';
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <h1 className="heading__text">GamerTalk</h1>
            <nav>
                <ul className="nav_bar">
                    <Link to="/" className="nav_item">
                        Home
                    </Link>
                    <Link to="/categories" className="nav_item">
                        Categories
                    </Link>
                    <div className="dropdown">
                        <nav className="nav_item">My Account</nav>
                        <div className="dropdown-content">
                            <Link to="/user" className="nav_item">
                                My Reviews
                            </Link>
                            <Link to="/sell" className="nav_item">
                                My Comments
                            </Link>
                            <Link to="/create-post" className="nav_item">
                                Create Post
                            </Link>
                        </div>
                    </div>
                </ul>
            </nav>

        </div >
    );
};

export default Nav;