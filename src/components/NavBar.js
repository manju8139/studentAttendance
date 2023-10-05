import React from 'react'
import { Link } from 'react-router-dom';

function NavBar() {

    return (
        <>
            <div className="navbar">
                <img src='images/navbar_logo.jpg' alt='welcome' className='logodesign' />
                <div className="navbar-links">
                    <Link to='/'>Home</Link>
                    <Link to='/adminlogin'>Admin</Link>
                    <Link to='/flogin'>Manager Login</Link>
                    <Link to='/studentlogin'>Employee Login</Link>
                    <Link to='/contact'>Contact</Link>
                </div>

            </div>
        </>
    )
}

export default NavBar