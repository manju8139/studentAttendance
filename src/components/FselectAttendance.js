import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Store } from '../Store';

function FselectAttendance() {
    const [subject, setSubject] = useState([]);
    const { state, dispatch } = useContext(Store);

    const changeSemHandler = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SELECT_SEM', payload: value })
    }

    const changeSubHandler = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SELECT_SUB', payload: value })
    }

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
            const result = await axios("https://attendancemanagementapi.azurewebsites.net/api/Subject/GetAll");
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
        if (!uniqueDeptSet.has(item.dept)) {
            uniqueDeptSet.add(item.dept);
            return true;
        }
        return false;
    });
    console.log("uniqueDept", uniqueDept);
    return (
        <div>
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
                <h1>Select Semester</h1>
                <select onChange={changeSemHandler}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                </select>
            </div>
            <div>
                <h1>Select subject</h1>
                <select onChange={changeSubHandler}>
                    {subject.map((item) => {
                        return <option key={item.id} value={item.name}>{item.name}</option>
                    })}
                </select>
            </div>
            <div>
                <h1>Select Dept</h1>
                <select onChange={changeDpHandler}>
                    {uniqueDept.map((item) => {
                        return <option key={item.id} value={item.dept}>{item.dept}</option>
                    })}
                </select>
            </div>
            <div><h3>Date : {state.date} - Selected Sem : {state.sem} - Selected Dept: {state.dept} - Selected Subject: {state.subject}</h3></div>
            {/* <button className='button' onClick={submitHandler}>Select</button> */}

            <Link className='linkbutton' to='/fviewattendance1'>View Attendance</Link>

        </div>
    )
}

export default FselectAttendance