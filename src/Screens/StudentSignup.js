import React, { useEffect, useState } from 'react'
import Anavbar from '../components/Anavbar';
import axios from 'axios';

function StudentSignup() {
    const [subject, setSubject] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: 'Male', // You can set a default value
        department: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        semister: '1',
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("https://attendancemanagementapi.azurewebsites.net/api/Subject/GetAll");
            // console.log("result:", result.data.value);
            setSubject(result.data.value);
        }

        fetchData();


    }, []);

    // Use a Set to keep track of unique department names
    const uniqueDeptSet = new Set();

    // Use a filtered array to store objects with unique department names
    const uniqueDept = subject.filter((item) => {
        if (!uniqueDeptSet.has(item.dept)) {
            uniqueDeptSet.add(item.dept);
            return true;
        }
        return false;
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to the server or perform validation
        // console.log(formData);


        // Validate phone number
        const isValidPhoneNumber = /^\d{10}$/.test(formData.phone);

        if (!isValidPhoneNumber) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        if (formData.department.trim() === '') {
            alert('Please select a department.');
            return;
        }

        if (formData.semister.trim() === '') {
            alert('Please select a Semister.');
            return;
        }

        axios
            .post('https://attendancemanagementapi.azurewebsites.net/api/Student/CreateEdit', formData)
            .then((response) => {
                // Handle the response from the server, e.g., show a success message or redirect
                console.log('Data sent successfully:', response.data);
                alert("student signup success");
            })
            .catch((error) => {
                // Handle any errors that occur during the POST request
                if (error.response) {
                    console.error('Server responded with an error:', error.response.data);
                } else {
                    console.error('Error sending data:', error.message);
                }
            });
        // Reset the form fields if needed
        setFormData({
            name: '',
            dob: '',
            gender: 'Male', // You can set a default value
            department: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            semister: '1',
        });
    };
    return (
        <>
            <Anavbar />

            <h1>Student Sign-up</h1>
            <form onSubmit={handleSubmit} className='formdesign'>

                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />


                <label htmlFor="dob">Date of Birth</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />


                <label htmlFor="gender">Gender</label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label htmlFor="department">Department</label>
                <select value={formData.department}
                    onChange={handleChange}
                    id="department"
                    name="department">
                    <option value="">Select Department</option>
                    {uniqueDept.map((item) => {
                        return <option key={item.id} value={item.dept}>{item.dept}</option>
                    })}
                </select>

                <label htmlFor="email">email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="contact">Contact</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="address">Address</label>
                <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                ></textarea>

                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="state">State</label>
                <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="semester">semester</label>
                <select
                    id="semister"
                    name="semister"
                    value={formData.semister}
                    onChange={handleChange}
                >
                    <option value="">Select Sem</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>



                <button type="submit">Sign Up</button>
            </form>

        </>
    )
}

export default StudentSignup