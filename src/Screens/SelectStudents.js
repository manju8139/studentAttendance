import React, { useContext, useEffect, useState } from 'react';
import FnavBar from '../components/FnavBar';

import { Store } from '../Store';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SelectStudents() {

    const { state, dispatch } = useContext(Store);
    const [subject, setSubject] = useState([]);


    const changeSemHandler = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SELECT_SEM', payload: value })
    }

    const changeDpHandler = (e) => {
        console.log("value=", e.target.value);
        const value = e.target.value;
        dispatch({ type: 'SELECT_DEPT', payload: value })
    }


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("https://attendancemanagementapi.azurewebsites.net/api/Subject/GetAll");
            console.log("result:", result.data.value);
            setSubject(result.data.value);
        }

        fetchData();
    }, []);
    return (
        <div>
            <FnavBar />
            <div>
                <h1>Select Semester</h1>
                <select onChange={changeSemHandler} id="sem" name="sem">
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                </select>
            </div>

            <div>
                <h1>Select Dept</h1>
                <select onChange={changeDpHandler} id="dept" name="dept">
                    {subject.map((item) => {
                        return <option key={item.id} value={item.dept}>{item.dept}</option>
                    })}
                </select>
            </div>
            <div><h3>Selected Sem : {state.sem} - Selected Dept: {state.dept} </h3></div>
            {/* <button className='button' onClick={submitHandler}>Select</button> */}
            <Link to='/fviewstudent' className='linkbutton'>View Student Details</Link>
        </div>
    )
}

export default SelectStudents