import * as types from './actionTypes';
// import OAuth from '../api/dataExchangeApi';

export const authorizationSuccess = token => (
  {
    type: types.AUTH_SUCCESS,
    state: token
  }
);


// export const authorize = () => {
//   return dispatch => {
//     return OAuth().then(token => {
//       console.log(token);
//       dispatch(authorizationSuccess(token));
//     }).catch( error => {
//       throw ( error );
//     });
//   };
// };


// const configOAuth = {
//   'url': 'https://pure-refuge-96117.herokuapp.com/auth',
//   'interactive': true
// };

// const channelListUrl = 'https://slack.com/api/channels.list?token=xoxp-30957858775-242778740935-298024768901-029128e6e66393a411c3595236d286f1&pretty=1';

// export const OAuth = () => {
//   chrome.identity.launchWebAuthFlow(configOAuth, redirectUrl => {
//     let arr = redirectUrl.match(/\?code\=(.+)\&/);
//     let token = `xoxp-${arr[1]}`;
//     return dispatch(authorizationSuccess(token));
//   });
// };



// export default OAuth;