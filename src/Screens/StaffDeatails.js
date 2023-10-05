import React from 'react'
import Anavbar from '../components/Anavbar'
import StaffDisplay from '../components/StaffDisplay'

function StaffDeatails() {
    return (
        <div className='divdesign'>
            <Anavbar />
            <div>
                <h1>Manager Details</h1>
                <hr />
                <StaffDisplay />
            </div>
        </div>
    )
}

export default StaffDeatails