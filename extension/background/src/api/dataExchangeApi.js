const configOAuth = {
  'url': 'https://pure-refuge-96117.herokuapp.com/auth', 
  'interactive': true
};

const channelListUrl = 'https://slack.com/api/channels.list?token=xoxp-30957858775-242778740935-298024768901-029128e6e66393a411c3595236d286f1&pretty=1';

export const OAuth = () => {
  chrome.identity.launchWebAuthFlow(configOAuth, redirectUrl => {
    console.log(redirectUrl);
    let arr = redirectUrl.match(/\?code\=(.+)\&/);
    let token = `xoxp-${arr[1]}`;
    console.log(token);
    
  });
};



export default OAuth;