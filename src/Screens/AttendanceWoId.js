import React, { useContext, useEffect, useState } from 'react'
import FnavBar from '../components/FnavBar'
import axios from 'axios';
import { Store } from '../Store';
import { Link } from 'react-router-dom';

function AttendanceWoId() {
    const [subject, setSubject] = useState([]);
    const { state, dispatch } = useContext(Store);

    const changeSubHandler = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SELECT_SUB', payload: value })
    }

    // const changeSubHandler = (e) => {
    //     const value = e.target.value;
    //     dispatch({ type: 'SELECT_SUB', payload: value })
    // }

    const changeDpHandler = (e) => {
        console.log("value=", e.target.value);
        const value = e.target.value;
        dispatch({ type: 'SELECT_DEPT', payload: value })
    }

    const changefDateHandler = (e) => {
        console.log("value=", e.target.value);
        const value = e.target.value;
        dispatch({ type: 'SET_FDATE', payload: value })
    }

    const changetDateHandler = (e) => {
        console.log("value=", e.target.value);
        const value = e.target.value;
        dispatch({ type: 'SET_TDATE', payload: value })
    }
    // const submitHandler = () => {
    //     dispatch({ type: 'SELECT_SUBJECT', payload: [state.sem, state.dept] });
    //     // navigate('../takeattendance')
    // }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("https://attendancemanagementapi.azurewebsites.net/api/Domain/GetAll");
            console.log("result:", result.data.value);
            setSubject(result.data.value);
        }

        fetchData();

        // Get the current date and format it as needed (e.g., yyyy-mm-dd)
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];

        dispatch({ type: 'SET_DATE', payload: formattedDate });
    }, [dispatch]);

    // Use a Set to keep track of unique department names
    const uniqueDeptSet = new Set();

    // Use a filtered array to store objects with unique department names
    const uniqueDept = subject.filter((item) => {
        if (!uniqueDeptSet.has(item.dname)) {
            uniqueDeptSet.add(item.dname);
            return true;
        }
        return false;
    });
    console.log("uniqueDept", uniqueDept);
    return (
        <>
            <FnavBar />
            <h1>Attendance List</h1>
            <hr />
            <div className='heading1'>
                <h1>View Attendance</h1>
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

            </div>
            <div>
                <h1>Select Role</h1>
                <select onChange={changeSubHandler}>
                    <option value="">Select Role</option>
                    <option value="FULL STACK DEVELOPER">FULL STACK DEVELOPER</option>
                    <option value="FRONT END DEVELOPER">FRONT END DEVELOPER</option>
                    <option value="BACK END DEVELOPER">BACK END DEVELOPER</option>
                    <option value="SOFTWARE TESTER">SOFTWARE TESTER</option>
                </select>
            </div>

            <div>
                <h1>Select Domain</h1>
                <select onChange={changeDpHandler}>
                    <option value="">Select Domian</option>
                    {uniqueDept.map((item) => {
                        return <option key={item.id} value={item.dname}>{item.dname}</option>
                    })}
                </select>
            </div>
            <div><h3>Date : {state.date} - Selected Role : {state.subject} - Selected Dept: {state.dept}</h3></div>
            {/* <button className='button' onClick={submitHandler}>Select</button> */}

            <Link className='linkbutton' to='/awoid1'>View Attendance</Link>


        </>
    )
}

export default AttendanceWoId