import React, { useContext, useEffect, useState } from 'react'
import FnavBar from '../components/FnavBar'
import { Store } from '../Store';
import axios from 'axios';

function AttendanceWoId1() {
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
            state.subject === student.semester &&
            state.dept === student.department &&
            studentDate >= fromDate &&
            studentDate <= toDate
        );
    });
    console.log("filtered data", filterAttendanceData);
    return (
        <>
            <FnavBar />
            <hr />

            <h1>{state.fdate} - {state.tdate} - {state.subject} - {state.dept}</h1>
            <h1>EMPLOYEE ATTENDANCE LIST</h1>
            <hr />
            <table>
                <tr><th>Date</th><th>EMPLOYEE ID</th><th>NAME</th><th>ROle</th><th>DOMAIN</th></tr>

                {
                    filterAttendanceData.map((student) => {
                        return <tr key={student.id}><td>{student.date}</td><td>{student.studid}</td><td>{student.studentName}</td><td>{student.semester}</td><td>{student.department}</td></tr>

                    })
                }
            </table>

        </>
    )
}

export default AttendanceWoId1