import { AUTH_SUCCESS, AUTH_ONLOAD, AUTH_FAIL, LOG_IN } from '../actions/actionTypes';

const initialState = {
    state: '',
    token: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
    case LOG_IN:
        return {
            token: action.token
        };
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