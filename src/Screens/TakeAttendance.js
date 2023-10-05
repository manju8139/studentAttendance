import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Store } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FnavBar from '../components/FnavBar';

let initialState = {
    students: [],
    loading: true,
    error: '',
}

const reducer2 = (statedata, action) => {
    switch (action.type) {

        case 'FETCH_REQUEST':
            return { ...statedata, loading: true }
        case 'FETCH_SUCCESS':
            return { ...statedata, loading: false, students: action.payload, error: '' }
        case 'FETCH_FAIL':
            return { ...statedata, loading: false, error: action.payload }
        default:
            return statedata;
    }
}
function TakeAttendance() {
    const navigate = useNavigate();
    const [statedata, dispatch2] = useReducer(reducer2, initialState)
    const { state, dispatch } = useContext(Store);

    const [studentData, setStudentData] = useState([]);
    const [isCheckedMap, setIsCheckedMap] = useState({});
    const [selectedStudents, setSelectedStudents] = useState([]); // Array to store selected student details


    const checkHandler = async (studentId, studentName, studentSemester) => {
        const formData = {
            studid: studentId,
            studentName: studentName,
            department: state.dept,
            semester: state.sem,
            subject: state.subject,
            date: state.date,
            status: 'P',
        }
        console.log("formData", formData);
        setIsCheckedMap((prevMap) => ({
            ...prevMap,
            [studentId]: !prevMap[studentId],
        }));

        if (!isCheckedMap[studentId]) {
            setSelectedStudents((prevSelectedStudents) => [
                ...prevSelectedStudents,
                { studid: studentId, name: studentName, semister: studentSemester },
            ]);
            console.log("attendance Formdata", formData);
            const getData = await axios.get(`https://attendancemanagementapi.azurewebsites.net/api/Attendance/Getstudentbyiddate?studid=${studentId}&date=${state.date}`)
            console.log("check status", getData);
            if (getData.data.value) {
                alert("attendance already marked");
                return;
            }
            axios
                .post('https://attendancemanagementapi.azurewebsites.net/api/Attendance/CreateEdit', formData)
                .then((response) => {
                    // Handle the response from the server, e.g., show a success message or redirect
                    alert(`Attendance Marked successfully for id:${studentId}`);
                    console.log('Attendance Marked successfully:', response.data);
                })
                .catch((error) => {
                    // Handle any errors that occur during the POST request
                    if (error.response) {
                        console.error('Server responded with an error:', error.response.data);
                    } else {
                        console.error('Error sending data:', error.message);
                    }
                });
            console.log("selectedStudents", selectedStudents);
            dispatch({ type: 'MARKED', payload: selectedStudents });
        } else {
            setSelectedStudents((prevSelectedStudents) =>
                prevSelectedStudents.filter((student) => student.studid !== studentId)
            );
            console.log("selected students", selectedStudents);
            axios
                .delete(`https://attendancemanagementapi.azurewebsites.net/api/Attendance/Deletestudentbyiddate?studid=${studentId}&date=${state.date}`)
                .then((response) => {
                    // Handle the response from the server, e.g., show a success message or redirect
                    console.log('Attendance unmarked successfully:', response.data);
                    alert("Attendance unmarked successfully");

                })
                .catch((error) => {
                    // Handle any errors that occur during the POST request
                    if (error.response) {
                        console.error('Server responded with an error:', error.response.data);
                    } else {
                        console.error('Error Deleting data:', error.message);
                    }
                });
            dispatch({ type: 'UNMARKED', payload: selectedStudents });
        }
    }

    const clickHandler = () => {
        console.log("submitted")
    }

    useEffect(() => {
        if (state.dept === 'ECE' || state.subject === '') {
            navigate('/attendance');
        }
        dispatch2({ type: 'FETCH_REQUEST' });
        const fetchData = async () => {
            try {
                const result = await axios("https://attendancemanagementapi.azurewebsites.net/api/Student/GetAll");
                setStudentData(result.data.value);
                // console.log("student main data", result.data.value);
                dispatch2({ type: 'FETCH_SUCCESS', payload: result.data.value });
            } catch (error) {
                dispatch2({ type: 'FETCH_FAIL', payload: error });
                console.log(error);
            }

        }

        fetchData();
    }, [navigate, state.dept, state.subject]);
    const foundStudent = studentData.filter((student) => student.semister === state.sem);
    console.log("foundStudent", foundStudent)
    return (
        <div>
            <FnavBar />
            <div className='maindiv'>
                <Link className='linkbutton' to='/attendance'>Select Domain</Link>
                <div className='headingatd'>
                    <h1>Take Attendance</h1><h3>Date: {state.date}</h3>
                </div>

                <div><h3>Selected Sem :<b> {state.sem}</b> - Selected Role: <b>{state.dept}</b> - Selected Domain: <b>{state.subject}</b></h3></div>
                <div>
                    {statedata.loading ? (
                        <h1>...loading</h1>
                    ) : (
                        foundStudent.map((student) => {
                            return <div key={student.id} className='takeAttendance'>
                                <h5>{student.id}</h5>
                                <h5>{student.name}</h5>
                                <h5>{student.semister}</h5>
                                <h5>{student.department}</h5>
                                <div className='checkbox'>
                                    <input
                                        type='checkbox'
                                        checked={isCheckedMap[student.id] || false}
                                        onChange={() => checkHandler(student.id, student.name, student.semister)}
                                    />
                                </div>
                            </div>
                        })

                    )}
                    <button className='button' onClick={clickHandler}>Submit</button>
                </div>
                <div><h1>No of Employee's Present-{state.count2}</h1></div>
                <div className='atdbucket'>
                    <h1>Attendance Bucket</h1>
                    {selectedStudents && selectedStudents.map((student) => {
                        return <div key={student.studid}>
                            <h5>{student.studid} - {student.name} - {student.semister} - {student.department}</h5>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default TakeAttendance