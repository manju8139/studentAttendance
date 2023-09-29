import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../Store';

function FViewAttendance() {
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
        // console.log("fdate", fromDate, " toDate", toDate, " student date", studentDate);
        // console.log("stateSem", fromDate, " toDate", toDate, " student date", studentDate);
        if (student.studid == getStudId && student.subject === "c" && student.department === "cs" && student.semester === "1") {
            console.log("getStudId", getStudId, "student.studid", student.studid);
            console.log("state.sem", state.sem, "student.semester", student.semester);
            console.log("state.dept", state.dept, "student.department", student.department);
            console.log("state.subject", state.subject, "student.subject", student.subject)
        }

        return (
            getStudId == student.studid &&
            state.sem === student.semester &&
            state.dept === student.department &&
            state.subject === student.subject &&
            studentDate >= fromDate &&
            studentDate <= toDate
        );
    });
    console.log("filtered data", filterAttendanceData);
    return (
        <div>

            <h1>{state.fdate} - {state.tdate} - {state.sem} - {state.dept} - {state.subject}</h1>
            <h1>STUDENT ATTENDANCE LIST</h1>
            <hr />
            <table>
                <tr><th>Date</th><th>STUDENT ID</th><th>NAME</th><th>SEM</th><th>DEPARTMENT</th></tr>

                {
                    filterAttendanceData.map((student) => {
                        return <tr key={student.id}><td>{student.date}</td><td>{student.studid}</td><td>{student.studentName}</td><td>{student.semester}</td><td>{student.department}</td></tr>

                    })
                }
            </table>
        </div>
    )
}

export default FViewAttendance