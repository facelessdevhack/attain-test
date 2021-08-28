import {
    USERS_FETCHED
} from '../at_actions/types';

const initialState = {
    userList: []
}

export default function (state = initialState, action) {
    switch(action.type) {
        case USERS_FETCHED:
            return {
                ...state,
                userList: action.payload
            }
        default:
            return state;
    }
}