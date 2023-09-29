import React, { useEffect, useState } from 'react'
import Anavbar from '../components/Anavbar';


function AdminHome() {
    const [username, setUsername] = useState('')
    useEffect(() => {
        const username = localStorage.getItem('username');
        setUsername(username);
    }, []);
    return (
        <div>
            <Anavbar />
            <h1>WELCOME {username}</h1>
        </div>
    )
}

export default AdminHome