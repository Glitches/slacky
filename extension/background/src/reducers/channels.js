import {
    GET_CHANNELS
} from "../actions/actionTypes";


const initialState = {
    channels: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_CHANNELS:
        return {
            ...state,
            channels: action.channels
        }
        default:
            return state;
    }
};
