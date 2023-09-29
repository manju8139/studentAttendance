import React from 'react';
import Snavbar from '../components/Snavbar';
import FselectAttendance from '../components/FselectAttendance';
import FnavBar from '../components/FnavBar';

function FViewAttendance() {
    return (
        <div>
            <FnavBar />

            <hr />
            <FselectAttendance />
        </div>
    )
}

export default FViewAttendance