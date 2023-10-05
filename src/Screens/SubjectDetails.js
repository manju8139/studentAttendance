import React from 'react'
import SubjectDisplay from '../components/SubjectDisplay'
import Anavbar from '../components/Anavbar'

function SubjectDetails() {
    return (
        <div className='divdesign'>
            <Anavbar />
            <div>
                <h1>Domain Details</h1>
                <hr />
                <SubjectDisplay />
            </div>
        </div>
    )
}

export default SubjectDetails