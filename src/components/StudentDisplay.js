import axios from 'axios';
import React, { useEffect, useReducer } from 'react'

let initialState = {
    data: [],
    loading: true,
    error: ''
};

const reducer = (state, action) => {
    console.log("student:", action.payload);
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, data: action.payload, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

function StudentDisplay() {

    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatch({ type: 'FETCH_REQUEST' })
        const fetchData = async () => {
            try {
                const result = await axios("https://attendancemanagementapi.azurewebsites.net/api/Student/GetAll");
                console.log("useeffect data", result.data.value);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data.value });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error });
                console.log(error);
            }

        }

        fetchData();
    }, []);

    const deleteHandler = (studentId) => {

        // Handle form submission, e.g., send data to the server or perform validation

        axios
            .delete(`https://attendancemanagementapi.azurewebsites.net/api/Student/Delete?id=${studentId}`)
            .then((response) => {
                // Handle the response from the server, e.g., show a success message or redirect
                console.log('Staff Data Deleted successfully:', response.data);
                alert("Staff Data Deleted successfully");
                window.location.reload();
            })
            .catch((error) => {
                // Handle any errors that occur during the POST request
                if (error.response) {
                    console.error('Server responded with an error:', error.response.data);
                } else {
                    console.error('Error Deleting data:', error.message);
                }
            });
    }
    return (
        <div>
            <hr />
            <table>
                <tr><th>EMPLOYEE ID</th><th>NAME</th><th>ROLE</th><th>ROLE</th><th>EMAIL</th><th>PHONE</th><th>ACTION</th></tr>
                {
                    state.loading ? (
                        <h1>...loading</h1>
                    ) : (
                        state.data && state.data.map((student) => {
                            return <tr key={student.id}><td>{student.id}</td><td>{student.name}</td><td>{student.semister}</td><td>{student.department}</td><td>{student.email}</td><td>{student.phone}</td><td><button onClick={() => deleteHandler(student.id)} className='button'>Delete</button></td></tr>
                        })
                    )
                }
            </table>
        </div>
    )
}

export default StudentDisplay