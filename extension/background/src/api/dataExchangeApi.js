const configOAuth = {
    'url': 'https://pure-refuge-96117.herokuapp.com/auth', 
    'interactive': true
};


const OAuth = () => {
    chrome.identity.launchWebAuthFlow(configOAuth, redirectUrl => {
        console.log(redirectUrl);
        return redirectUrl;
    });
};

export default OAuth;