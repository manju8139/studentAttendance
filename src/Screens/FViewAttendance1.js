import React from 'react';
import FViewAttendance from '../components/FViewAttendance';
import Snavbar from '../components/Snavbar';


function FViewAttendance1() {
    return (
        <div>
            <Snavbar />
            <h1>Attendance List</h1>
            <hr />
            <FViewAttendance />
        </div>
    )
}

export default FViewAttendance1