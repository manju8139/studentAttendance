import React from 'react'
import { Link } from 'react-router-dom'

function FnavBar() {
    const handleLogout = () => {
        // Clear the local storage
        localStorage.setItem('fusername', '');
    };
    return (
        <>
            <div className="navbar">
                <img src='images/stafflogo.png' alt='welcome' className='logodesign' />
                <div className="navbar-links">
                    <Link to='/facultyhome'>Home</Link>
                    <Link to='/selectstudent'>Employee Details</Link>
                    <Link to='/attendance'>Take Attendance</Link>
                    <Link to='/awoid'>View Attendance</Link>
                    <Link to='/' onClick={handleLogout}>Logout</Link>
                </div>


            </div>
        </>
    )
}

export default FnavBar