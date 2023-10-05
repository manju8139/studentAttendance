import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../Store'
import axios from 'axios';
import FnavBar from '../components/FnavBar';

function FviewStudent() {
    const { state } = useContext(Store);
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("https://attendancemanagementapi.azurewebsites.net/api/Student/GetAll")
            setStudents(result.data.value);
        }
        fetchData();
    }, []);
    console.log("students", students);
    const filterStudentData = students.filter((student) => {
        return state.sem === student.semister && state.dept === student.department
    });
    console.log("filtered data", filterStudentData);
    return (
        <div>
            <FnavBar />
            <h1>EMPLOYEE LIST</h1>
            <hr />
            <table>
                <tr><th>EMPLOYEE ID</th><th>NAME</th><th>SEM</th><th>ROLE</th></tr>

                {
                    filterStudentData.map((student) => {
                        return <tr key={student.id}><td>{student.id}</td><td>{student.name}</td><td>{student.semister}</td><td>{student.department}</td></tr>

                    })
                }
            </table>
        </div>
    )
}

export default FviewStudent