import axios from 'axios';
import {
    USERS_FETCHED,
    USERS_FETCHING_FAILED,
    FETCHING_USERS,
    USER_CREATED
} from './types';

export const fetchingUsers = (pageNum) => (dispatch) => {
    axios.get(`http://127.0.0.1:5000/users?_limit=20&_page=${pageNum}`)
        .then(res => (
            dispatch({
                type: USERS_FETCHED,
                payload: res.data,
            })
        ))
        .catch(err => (
            console.log(err)
        ))
}
export const createUser = (fullName, Country, DOB, Email, CreateAt ) => (dispatch) => {
    // Request Body 
    const body = { "Full Name": fullName, "Country": Country.label, "Date Of Birth": DOB, "Email": Email, "CreateAt": CreateAt };
    console.log(body)
    axios.post(`http://127.0.0.1:5000/users`, body)
        .then(res => (
            dispatch({
                type: USER_CREATED,
                payload: res.data
            })
        ))
        .catch(err => (
            console.log(err)
        ))
}
export const deleteOldUser = (id) => (dispatch) => {
    axios.delete(`http://127.0.0.1:5000/users?Id=${id}`)
        .then(res => (
            console.log(res)
        ))
}
export const deleteUser = (id) => (dispatch) => {
    axios.delete(`http://127.0.0.1:5000/users/${id}`)
        .then(res => (
            console.log(res)
        ))
}