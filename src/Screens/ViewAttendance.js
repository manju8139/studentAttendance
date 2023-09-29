import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../Store'
import axios from 'axios';
import Anavbar from '../components/Anavbar';


function ViewAttendance() {

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

    const filterAttendanceData = attendanceData && attendanceData.filter((student) => {
        const studentDate = student.date.substring(0, 10);
        const fromDate = new Date(state.fdate).toISOString().substring(0, 10);
        const toDate = new Date(state.tdate).toISOString().substring(0, 10);
        // console.log("fdate", fromDate, " toDate", toDate, " student date", studentDate);
        // console.log("stateSem", fromDate, " toDate", toDate, " student date", studentDate);
        return (
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
            <Anavbar />
            <h1>ATTENDANCE DETAILS</h1>
            <hr />
            <div className='items'>
                <table>
                    <tbody>
                        <tr>
                            <td><label>From Date:</label></td>
                            <td><h4>{state.fdate}</h4></td>
                        </tr>
                        <tr>
                            <td><label>To Date:</label></td>
                            <td><h4>{state.tdate}</h4></td>
                        </tr>
                        <tr>
                            <td><label>Semester:</label></td>
                            <td><h4>{state.sem}</h4></td>
                        </tr>
                        <tr>
                            <td><label>Department:</label></td>
                            <td><h4>{state.dept}</h4></td>
                        </tr>
                        <tr>
                            <td><label>Subject:</label></td>
                            <td><h4>{state.subject}</h4></td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <hr />
            <h1>STUDENT ATTENDANCE LIST</h1>
            <hr />
            <table>
                <tr><th>Date</th><th>STUDENT ID</th><th>NAME</th><th>SEM</th><th>DEPARTMENT</th></tr>

                {
                    filterAttendanceData && filterAttendanceData.map((student) => {
                        return <tr key={student.id}><td>{student.date}</td><td>{student.id}</td><td>{student.studentName}</td><td>{student.semester}</td><td>{student.department}</td></tr>

                    })
                }
            </table>
        </div>
    )
}

export default ViewAttendance