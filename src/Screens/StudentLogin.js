import React, { useEffect, useState } from 'react';
import '../css/AdminLogin.css'; // Import your CSS file for the login form
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentLogin() {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        const handleLogin = () => {
            const { username, password } = formData;
            const foundStaff = studentData.find((staff) => staff.name === username && staff.email === password);

            if (foundStaff) {
                localStorage.setItem('susername', formData.username);
                localStorage.setItem('studid', foundStaff.id);
                navigate('../studenthome');
            } else {
                console.log('Login failed');
                alert("Enter correct username and password");
            }
        };

        if (studentData.length > 0) {
            handleLogin();
        }
    }, [studentData, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('https://attendancemanagementapi.azurewebsites.net/api/Student/GetAll');
            setStudentData(response.data.value);
        } catch (error) {
            console.error('Error fetching staff data:', error);
            alert('Error fetching staff data');
        }
    };
    return (
        <>
            <NavBar />
            <div className="login-container">
                <h2>Employee Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>

    )
}

export default StudentLogin