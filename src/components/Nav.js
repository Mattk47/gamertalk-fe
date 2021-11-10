import React from 'react';
import { Link } from 'react-router-dom'


const Nav = () => {
    return (
        <div>
            <nav>
                <ul className="nav_bar nav--margin">
                    <Link to="/" className="nav__item">
                        Home
                    </Link>
                    <Link to="/categories" className="nav__item">
                        Categories
                    </Link>
                    <div className="dropdown">
                        <nav className="nav__item">My Account</nav>
                        <div className="dropdown--content">
                            <Link to="/my-reviews" className="nav__item">
                                My Reviews
                            </Link>
                            <Link to="/create-post" className="nav__item">
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