import React from 'react';
import FViewAttendance from '../components/FViewAttendance';
import Snavbar from '../components/Snavbar';
import FnavBar from '../components/FnavBar';

function FViewAttendance1() {
    return (
        <div>
            <FnavBar />
            <h1>Attendance List</h1>
            <hr />
            <FViewAttendance />
        </div>
    )
}

export default FViewAttendance1