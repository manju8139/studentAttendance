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
function SubjectDisplay() {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatch({ type: 'FETCH_REQUEST' })
        const fetchData = async () => {
            try {
                const result = await axios("https://attendancemanagementapi.azurewebsites.net/api/Domain/GetAll");
                console.log("useeffect data", result.data.value);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data.value });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error });
                console.log(error);
            }

        }

        fetchData();
    }, []);

    const deleteHandler = (subjectId) => {

        // Handle form submission, e.g., send data to the server or perform validation

        axios
            .delete(`https://attendancemanagementapi.azurewebsites.net/api/Domain/Delete?id=${subjectId}`)
            .then((response) => {
                // Handle the response from the server, e.g., show a success message or redirect
                console.log('Subject Deleted successfully:', response.data);
                alert("Domain Deleted successfully");
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
            <table>
                <thead><tr><th>DOMAIN ID</th><th>NAME</th><th>ROLE</th><th>ACTION</th></tr></thead>
                <tbody>
                    {
                        state.loading ? (
                            <tr><td>...loading</td></tr>
                        ) : (
                            state.data && state.data.map((subject) => {
                                return <tr key={subject.id}><td>{subject.id}</td><td>{subject.dname}</td><td>{subject.role}</td><td><button onClick={() => deleteHandler(subject.id)} className='button'>Delete</button></td></tr>
                            })
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SubjectDisplay