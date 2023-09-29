import React, { useEffect, useState } from 'react';
import '../css/AdminLogin.css';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({});
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        const handleLogin = async () => {
            console.log("admin data", adminData);

            if (formData.username === adminData.username && formData.password === adminData.username) {
                localStorage.setItem('ausername', formData.username);
                navigate('../adminhome');
            } else {
                console.log('Login failed');
                alert("Enter correct username and password");
            }
        };

        if (adminData.username !== undefined) {
            handleLogin();
        }
    }, [adminData, navigate]);

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
            const response = await axios.get('https://attendancemanagementapi.azurewebsites.net/api/Admin/Get?id=1');
            setAdminData(response.data.value);
        } catch (error) {
            console.error('Error fetching admin data:', error);
            alert('Error fetching admin data');
        }
    };

    return (
        <>
            <NavBar />
            <div className="login-container">
                <h2>Admin Login</h2>
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
    );
}

export default AdminLogin;
