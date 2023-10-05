import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../Store';

function ViewAttendance() {
    const { state } = useContext(Store);
    const [subject, setSubject] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        department: 'CS',
        semister: '1',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const clickHandler = (e) => {
        e.preventDefault();

        axios
            .post('https://attendancemanagementapi.azurewebsites.net/api/Subject/CreateEdit', formData)
            .then((response) => {
                // Handle the response from the server, e.g., show a success message or redirect
                console.log('Subject saved successfully:', response.data);
                alert("Subject saved success");
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
            department: 'CS',
            semister: '1',
        });
    }
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("https://attendancemanagementapi.azurewebsites.net/api/Student/GetAll");
            console.log("result:", result.data.value);
            setSubject(result.data.value);
        }

        fetchData();
    }, []);
    return (
        <div>
            {/* <FnavBar /> */}
            <div>
                <h1>Select Role</h1>
                <select onChange={handleChange} id="sem" name="sem">
                    <option value="">Select Role</option>
                    <option value="1">FULL STACK DEVELOPER</option>
                    <option value="2">FRONT END DEVELOPER</option>
                    <option value="3">BACK END DEVELOPER</option>
                    <option value="4">SOFTWARE TESTER</option>
                </select>
            </div>

            <div>
                <h1>Select Role</h1>
                <select onChange={handleChange} id="dept" name="dept">
                    {subject.map((item) => {
                        return <option key={item.id} value={item.dept}>{item.dept}</option>
                    })}
                </select>
            </div>
            <div><h3>Selected Sem : {state.sem} - Selected Role: {state.dept} - Selected Domain: {state.subject} </h3></div>
            {/* <button className='button' onClick={submitHandler}>Select</button> */}
            <button className='button' onClick={clickHandler}>View Attendance List</button>
        </div>
    )
}

export default ViewAttendance