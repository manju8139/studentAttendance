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
                    <Link to='/studentsignup'>Add Student</Link>
                    <Link to='/fsignup'>Add Staff</Link>
                    <Link to='/addsubject'>Add Subject</Link>
                    <Link to="/displayall">Student Details</Link>
                    <Link to="/staffdetails">Staff Details</Link>
                    <Link to="/subjectdetails">Subject Details</Link>
                    <Link to="/aviewattendance">View Attendance</Link>
                    <Link to='/' onClick={handleLogout}>Logout</Link>
                </div>


            </div>
        </>
    )
}

export default Anavbar