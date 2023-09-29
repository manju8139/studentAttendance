import React from 'react'
import NavBar from '../components/NavBar'

function HomeScreen() {
    return (
        <>
            <NavBar />
            <div>
                <h1>WELCOME TO STUDENT ATTENDANCE SYSTEM</h1>
                <hr />
                <img src='images/attendancemain2.png' alt='mainpic' className='image_main' />
            </div>
        </>
    )
}

export default HomeScreen