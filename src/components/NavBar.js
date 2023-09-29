import React from 'react'
import { Link } from 'react-router-dom';

function NavBar() {
    // const [facultyDropdownVisible, setFacultyDropdownVisible] = useState(false);
    // const [studentDropdownVisible, setStudentDropdownVisible] = useState(false);

    // const toggleFacultyDropdown = () => {
    //     setFacultyDropdownVisible(!facultyDropdownVisible);
    // };

    // const toggleStudentDropdown = () => {
    //     setStudentDropdownVisible(!studentDropdownVisible);
    // };
    return (
        <>
            <div className="navbar">
                <img src='images/navbar_logo.jpg' alt='welcome' className='logodesign' />
                <div>
                    <Link to='/'>Home</Link>
                    <Link to='/adminlogin'>Admin</Link>
                    <Link to='/flogin'>Staff Login</Link>
                    <Link to='/studentlogin'>Student Login</Link>
                    <Link to='/contact'>Contact</Link>
                </div>

                {/* <div className={`dropdown ${facultyDropdownVisible ? 'active' : ''}`} onMouseEnter={toggleFacultyDropdown} onMouseLeave={toggleFacultyDropdown}>
                    <button className="dropbtn">Faculty</button>
                    <div className="dropdown-content">
                        <Link to='/fsignup'>Signup</Link>
                        <Link to='/flogin'>Login</Link>
                    </div>
                </div>
                <div className={`dropdown ${studentDropdownVisible ? 'active' : ''}`} onMouseEnter={toggleStudentDropdown} onMouseLeave={toggleStudentDropdown}>
                    <button className="dropbtn">Student</button>
                    <div className="dropdown-content">
                        <Link to='/studentsignup'>Signup</Link>
                        <Link to='/studentlogin'>Login</Link>
                    </div>

                </div> */}

            </div>
        </>
    )
}

export default NavBar