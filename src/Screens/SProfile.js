import React, { useContext, useEffect, useState } from 'react'
import Snavbar from '../components/Snavbar'
import axios from 'axios';
import { Store } from '../Store';

function SProfile() {
    const { state } = useContext(Store);
    const [attendanceData, setAttendanceData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("https://attendancemanagementapi.azurewebsites.net/api/Attendance/GetAll")
            setAttendanceData(result.data.value);
            console.log("attendance data", result.data.value);
        }
        fetchData();
    }, []);

    const filterAttendanceData = attendanceData.filter((student) => {
        const studentDate = student.date.substring(0, 10);
        const fromDate = new Date(state.fdate).toISOString().substring(0, 10);
        const toDate = new Date(state.tdate).toISOString().substring(0, 10);
        const getStudId = localStorage.getItem('studid');


        return (
            getStudId == student.studid &&
            state.sem === student.semester &&
            state.dept === student.department &&
            studentDate >= fromDate &&
            studentDate <= toDate
        );
    });
    console.log(filterAttendanceData);
    return (
        <div>
            <Snavbar />
            <h1>Employee Profile</h1>
            <table>
                <tr><th>Role</th><th>EMPLOYEE ID</th><th>NAME</th><th>ROle</th><th>DOMAIN</th></tr>

                {
                    filterAttendanceData.map((student) => {
                        return <tr key={student.id}><td>{student.subject}</td><td>{student.studid}</td><td>{student.studentName}</td><td>{student.semester}</td><td>{student.department}</td></tr>

                    })
                }
            </table>
            <hr />
        </div>
    )
}

export default SProfile