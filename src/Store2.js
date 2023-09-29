import { createContext, useReducer } from "react";

export const Store2 = createContext();


const initialState2 = {
    count2: 0,
    attendance: {
        attendanceBuck: [],
    }
};

const reducer2 = (state2, action) => {

    switch (action.type) {
        case 'MARKED':
            const newStudent = action.payload;
            console.log("attendanceBuck", state2.attendance.attendanceBuck);
            const existStudent = state2.attendance.attendanceBuck.find((student) => student.id === newStudent.id);
            const attendanceBuck = existStudent
                ? state2.attendance.attendanceBuck.map((item) =>
                    item.id === existStudent.id ? newStudent : item
                )
                : [...state2.attendance.attendanceBuck, newStudent];
            return {
                ...state2,
                count2: state2.count2 + 1,
                attendance: {
                    ...state2.attendance,
                    attendanceBuck,
                }
            }
        case 'UNMARKED':
            return {
                ...state2,
                count2: state2.count2 - 1,
                attendance: {
                    ...state2.attendance,
                    attendanceBuck: action.payload,
                }
            }
        default:
            return state2;
    }
}


export function StoreProvider2(props) {
    const [state2, dispatch2] = useReducer(reducer2, initialState2);
    const value = { state2, dispatch2 };
    return <Store2.Provider value={value}>{props.children}</Store2.Provider>
}