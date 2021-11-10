import React from 'react';
import { Link } from 'react-router-dom'

const Header = ({ userHasAuthenticated, isAuthenticated }) => {

    function handleLogout({ setUser }) {
        userHasAuthenticated(false);
        setUser({});
        localStorage.clear();
    }
    return (
        <div className='header__links'>
            <h1 className='header'>GAMERTALK</h1>
            {isAuthenticated ? (
                <Link to='/' onClick={handleLogout} className='header__buttons'>Logout</Link>
            ) : (
                <>
                    <Link to="/sign-up" className='header__buttons'>
                        Signup
                    </Link>
                    <Link to="/login" className='header__buttons'>
                        Login
                    </Link>
                </>
            )}
        </div>
    );
};

export default Header;
