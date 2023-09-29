import { createContext, useReducer } from "react";

export const Store = createContext();


const initialState = {
    count: 0,
    date: Date(),
    fdate: '',
    tdate: '',
    sem: '1',
    studid: 0,
    subject: 'C',
    dept: 'cs',
    count2: 0,
};

const reducer = (state, action) => {
    console.log("action.payload", action.payload);
    switch (action.type) {
        case 'SELECT_SEM':
            return { ...state, count: state.count + 1, sem: action.payload }
        case 'SELECT_SUB':
            return { ...state, subject: action.payload }
        case 'SELECT_DEPT':
            return { ...state, dept: action.payload }
        case 'SET_DATE':
            return {
                ...state, date: action.payload
            }
        case 'SET_FDATE':
            return {
                ...state, fdate: action.payload
            }
        case 'SET_TDATE':
            return {
                ...state, tdate: action.payload
            }
        case 'MARKED':
            return {
                ...state,
                count2: state.count2 + 1,

            }
        case 'UNMARKED':
            return {
                ...state,
                count2: state.count2 - 1,
            }
        default:
            return state;
    }
}


export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}