import React from 'react';
import StudentDisplay from '../components/StudentDisplay';
import Anavbar from '../components/Anavbar';
import SubjectDisplay from '../components/SubjectDisplay';

function DisplayScreen() {
    return (
        <div className='divdesign'>
            <Anavbar />
            <div>
                <h1>Student Details</h1>
                <StudentDisplay />
            </div>
            <hr />
        </div>
    )
}

export default DisplayScreen