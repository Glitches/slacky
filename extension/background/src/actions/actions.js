import * as types from './actionTypes';
import OAuth from '../api/dataExchangeApi';

export const authorizationSuccess = token => (
    {
        type: types.AUTH_SUCCESS,
        state: token
    }
);

export const authorize = () => {
    return dispatch => {
        return OAuth().then(token => {
            dispatch(authorizationSuccess(token));
        }).catch( error => {
            throw( error );
        });
    };
};