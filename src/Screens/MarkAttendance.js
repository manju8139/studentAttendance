import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import FnavBar from '../components/FnavBar';
function MarkAttendance() {
    // const navigate = useNavigate();
    const [subject, setSubject] = useState([]);
    const { state, dispatch } = useContext(Store);

    const changeSemHandler = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SELECT_SEM', payload: value })
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
        if (!uniqueDeptSet.has(item.dept)) {
            uniqueDeptSet.add(item.dept);
            return true;
        }
        return false;
    });
    console.log("uniqueDept", uniqueDept);
    return (
        <>
            <FnavBar />
            <div><h1>Mark Attendance-Date: {state.date}</h1></div>
            <div>
                <h1>Select Role</h1>
                <select onChange={changeSemHandler}>
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
                    <option value="">Select Domain</option>
                    {subject && subject.map((item) => {
                        return <option key={item.id} value={item.dname}>{item.dname}</option>
                    })}
                </select>
            </div>

            <div><h3>Selected Role : {state.sem} - Selected Domain: {state.dept}</h3></div>
            {/* <button className='button' onClick={submitHandler}>Select</button> */}
            <Link className='linkbutton' to='/takeattendance'>Take Attendance</Link>
        </>

    )
}

export default MarkAttendance