import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

let initialState = {
    data: [],
    loading: true,
    error: ''
};

const reducer = (state, action) => {
    console.log("staff:", action.payload);
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
function StaffDisplay() {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatch({ type: 'FETCH_REQUEST' })
        const fetchData = async () => {
            try {
                const result = await axios("https://attendancemanagementapi.azurewebsites.net/api/Staff/GetAll");
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data.value });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error });
                console.log(error);
            }

        }

        fetchData();
    }, []);

    const deleteHandler = (staffId) => {

        // Handle form submission, e.g., send data to the server or perform validation
        console.log("StaffID:", staffId);
        axios
            .delete(`https://attendancemanagementapi.azurewebsites.net/api/Staff/Delete?id=${staffId}`)
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

            {
                state.loading ? (
                    <h1>...loading</h1>
                ) : (
                    <>
                        <table>
                            <tr><th>MANAGER ID</th><th>NAME</th><th>DOMAIN</th><th>ACTION</th></tr>
                            {state.data && state.data.map((staff) => {
                                return <tr key={staff.id}><td>{staff.id}</td><td>{staff.name}</td><td>{staff.department}</td><td><button onClick={() => deleteHandler(staff.id)} className='button'>Delete</button></td></tr>
                            })}
                        </table>
                    </>
                )
            }

        </div>
    )
}

export default StaffDisplay