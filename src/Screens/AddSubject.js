import React, { useState } from 'react';
import Anavbar from '../components/Anavbar';
import axios from 'axios';

function AddSubject() {
    const [formData, setFormData] = useState({
        name: '',
        dept: '',
        sem: '1',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const uppercaseValue = value.toUpperCase(); // Convert to uppercase
        setFormData({
            ...formData,
            [name]: uppercaseValue,
        });
    };

    const handleSemChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('https://attendancemanagementapi.azurewebsites.net/api/Subject/CreateEdit', formData)
            .then((response) => {
                // Handle the response from the server, e.g., show a success message or redirect
                console.log('Subject saved successfully:', response.data);
                alert('Subject saved successfully');
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
            dept: '',
            sem: '1',
        });
    };

    return (
        <div>
            <Anavbar />
            <h2>Add Subject Details</h2>
            <form onSubmit={handleSubmit} className='formdesign'>

                <div>
                    <label htmlFor="subjectName">Subject Name:</label>
                    <input
                        type="text"
                        id="subjectName"
                        name="name" // Add the name attribute
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="semester">Semester:</label>
                    <select
                        id="semester"
                        name="sem" // Add the name attribute
                        value={formData.sem}
                        onChange={handleSemChange}
                        required
                    >
                        {[1, 2, 3, 4, 5, 6].map((sem) => (
                            <option key={sem} value={sem}>
                                {sem}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="course">Course:</label>
                    <input
                        type="text"
                        id="course"
                        name="dept" // Add the name attribute
                        value={formData.dept}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddSubject;
