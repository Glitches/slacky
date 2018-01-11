import { AUTH_SUCCESS, AUTH_ONLOAD, AUTH_FAIL } from '../actions/actionTypes';

const initialState = '';

export default (state = initialState, action) => {
    switch (action.type) {
    case AUTH_SUCCESS:  
        return state;
    case AUTH_ONLOAD:  
        return state;
    case AUTH_FAIL:  
        return state;
    default:
        return state;
    }
};