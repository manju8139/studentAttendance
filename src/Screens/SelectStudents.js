import React, { useContext, useEffect, useState } from 'react';
import FnavBar from '../components/FnavBar';

import { Store } from '../Store';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SelectStudents() {

    const { state, dispatch } = useContext(Store);
    const [subject, setSubject] = useState([]);


    const changeSubHandler = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SELECT_SUB', payload: value })
    }

    const changeDpHandler = (e) => {
        console.log("value=", e.target.value);
        const value = e.target.value;
        dispatch({ type: 'SELECT_DEPT', payload: value })
    }


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("https://attendancemanagementapi.azurewebsites.net/api/Domain/GetAll");
            console.log("result:", result.data.value);
            setSubject(result.data.value);
        }

        fetchData();
    }, []);
    return (
        <div>
            <FnavBar />
            <h1>EMPLOYEE DETAILS</h1>
            <hr />
            <div>
                <h1>Select Role</h1>
                <select onChange={changeSubHandler} id="sem" name="sem">
                    <option value="">Select Role</option>
                    <option value="FULL STACK DEVELOPER">FULL STACK DEVELOPER</option>
                    <option value="FRONT END DEVELOPER">FRONT END DEVELOPER</option>
                    <option value="BACK END DEVELOPER">BACK END DEVELOPER</option>
                    <option value="SOFTWARE TESTER">SOFTWARE TESTER</option>
                </select>
            </div>

            <div>
                <h1>Select Domain</h1>
                <select onChange={changeDpHandler} id="dept" name="dept">
                    <option value="">Select Domain</option>
                    {subject.map((item) => {
                        return <option key={item.id} value={item.dname}>{item.dname}</option>
                    })}
                </select>
            </div>
            <div><h3>Selected Role : {state.subject} - Selected Domain: {state.dept} </h3></div>
            {/* <button className='button' onClick={submitHandler}>Select</button> */}
            <Link to='/fviewstudent' className='linkbutton'>View Employee Details</Link>

        </div>
    )
}

export default SelectStudents