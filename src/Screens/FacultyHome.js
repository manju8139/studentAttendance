import React, { useEffect, useState } from 'react'
import FnavBar from '../components/FnavBar'

function FacultyHome() {
    const [username, setUsername] = useState('')
    useEffect(() => {
        const username = localStorage.getItem('fusername');
        setUsername(username);
    }, []);
    return (
        <>
            <FnavBar />
            <div className='homepage'>
                <h1>WELCOME MANAGER - {username}</h1>
            </div>
        </>
    )
}

export default FacultyHome