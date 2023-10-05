import React from 'react'
import { Link } from 'react-router-dom'

function Anavbar() {
    const handleLogout = () => {
        // Clear the local storage
        localStorage.setItem('ausername', '');
    };
    return (
        <>
            <div className="navbar">
                <img src='images/logo2.jpg' alt='welcome' className='logodesign' />
                <div className="navbar-links">
                    <Link to='/adminhome'>Home</Link>
                    <Link to='/studentsignup'>Add Employee</Link>
                    <Link to='/fsignup'>Add manager</Link>
                    <Link to='/addsubject'>Add Domain</Link>
                    <Link to="/displayall">Employee Details</Link>
                    <Link to="/staffdetails">Manager Details</Link>
                    <Link to="/subjectdetails">Domain Details</Link>
                    <Link to="/aviewattendance">View Attendance</Link>
                    <Link to='/' onClick={handleLogout}>Logout</Link>
                </div>


            </div>
        </>
    )
}

export default Anavbar