import React from 'react'
import NavBar from '../components/NavBar'

function HomeScreen() {
    return (
        <>
            <NavBar />
            <div>
                <h1 className='rh1'>WELCOME TO EMPLOYEE ATTENDANCE SYSTEM</h1>
                <hr />
                <img src='images/attendancemain2.png' alt='mainpic' className='image_main' />
            </div>
        </>
    )
}

export default HomeScreen