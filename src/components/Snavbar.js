import React from 'react'
import { Link } from 'react-router-dom'

function Snavbar() {
    const handleLogout = () => {
        // Clear the local storage
        localStorage.setItem('susername', '');
    };
    return (
        <>
            <div className="navbar">
                <img src='images/attendance.jpg' alt='welcome' className='logodesign' />
                <div className="navbar-links">
                    <Link to='/studenthome'>Home</Link>
                    <Link to='/sprofile'>Student Details</Link>
                    {/* <Link to='/sattendance'>Mark Attendance</Link> */}
                    <Link to='/fviewattendance'>View Attendance</Link>
                    <Link to='/sattendanceavg'>Attendance Average</Link>
                    <Link to='/' onClick={handleLogout}>Logout</Link>
                </div>


            </div>
        </>
    )
}

export default Snavbar