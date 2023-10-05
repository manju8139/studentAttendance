import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import Snavbar from '../components/Snavbar';
import axios from 'axios';

function SAttendanceAverage() {
    const { state, dispatch } = useContext(Store);
    const [atdData, setAtdData] = useState([]);
    const [mainData, setMainData] = useState([]);
    const [subject, setSubject] = useState([]);
    const [subData, setSubData] = useState([]);
    const [studid, setStudid] = useState('');

    useEffect(() => {
        const studentid = localStorage.getItem('studid');
        setStudid(studentid);
        dispatch({ type: 'SET_FDATE', payload: '' });
        dispatch({ type: 'SET_TDATE', payload: '' });
        setAtdData([]);
        const fetchData = async () => {
            try {
                const result = await axios.get(`https://attendancemanagementapi.azurewebsites.net/api/Attendance/Getstudentbyid?studid=${studentid}`);
                console.log("result:", result.data.value);
                setMainData(result.data.value);
                const result1 = await axios("https://attendancemanagementapi.azurewebsites.net/api/Domain/GetAll");
                console.log("result1:", result1.data.value);
                setSubject(result1.data.value);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        }

        fetchData();
    }, [dispatch, studid]);

    useEffect(() => {
        console.log("i am in condition 1");
        // Check if both fdate and tdate are set before filtering

        if (state.fdate && state.tdate) {
            console.log("i am in condition 2");


            // Filter atdData based on date range
            const filteredData = mainData.filter((student) => {
                const studentDate = new Date(student.date).toISOString().split('T')[0];
                const fromDate = new Date(state.fdate).toISOString().split('T')[0];
                const toDate = new Date(state.tdate).toISOString().split('T')[0];
                console.log(studentDate, "-", fromDate, "-", toDate);
                return studentDate >= fromDate && studentDate <= toDate && student.subject === state.subject;
            });
            console.log("filtered data", filteredData);

            setAtdData(filteredData);
            console.log("atdData", atdData);
        }


    }, [state.fdate, state.tdate]); // Only include fdate and tdate as dependencies

    const changefDateHandler = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_FDATE', payload: value });
    }

    const changetDateHandler = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_TDATE', payload: value });
    }

    const changeDpHandler = (e) => {
        const value = e.target.value;
        console.log("subject selected", value);
        console.log("in sub change Handler atdData", atdData);
        dispatch({ type: 'SELECT_DEPT', payload: value });
        // const filterSubData = atdData && atdData.filter((student) => {
        //     console.log(student.subject)
        //     return state.subject === student.subject
        // })
        // setAtdData(filterSubData);
    }

    return (
        <div>
            <Snavbar />
            <div className='heading1'>
                <h1>View Attendance for Employee ID: {studid}</h1>
                <h3>From Date: {state.fdate} - To Date: {state.tdate}</h3>
            </div>
            <hr />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div>
                    <h3>From Date</h3>
                    <input type='date' onChange={changefDateHandler} className='date' id='date' />
                </div>
                <div>
                    <h3>To Date</h3>
                    <input type='date' onChange={changetDateHandler} className='date' id='date' />
                </div>
                <div>
                    <h3>Select Domain - {state.dept}</h3>
                    <select onChange={changeDpHandler}>
                        <option value="">Select Domain</option>
                        {subject.map((item) => {
                            return <option key={item.id} value={item.dname}>{item.dname}</option>
                        })}
                    </select>
                </div>
            </div>
            <div>
                {atdData && atdData.map((student, index) => (
                    <h1 key={index}>{student.studid} - {student.studentName} - {student.department}</h1>
                ))}
            </div>
            <hr />



        </div>
    );
}

export default SAttendanceAverage;
