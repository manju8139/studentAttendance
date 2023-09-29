import React, { useEffect, useState } from 'react'
import Snavbar from '../components/Snavbar'

function StudentHome() {
    const [username, setUsername] = useState('')
    useEffect(() => {
        const username = localStorage.getItem('susername');
        setUsername(username);
    }, []);
    return (
        <>
            <Snavbar />
            <div className='login'>
                <h1>WELCOME - {username}</h1>
            </div>
        </>
    )
}

export default StudentHome