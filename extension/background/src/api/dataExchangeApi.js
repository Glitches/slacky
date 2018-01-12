const configOAuth = {
    'url': 'https://pure-refuge-96117.herokuapp.com/auth', 
    'interactive': true
};

const channelListUrl = 'https://slack.com/api/channels.list?token=xoxp-30957858775-242778740935-298024768901-029128e6e66393a411c3595236d286f1&pretty=1';

export const OAuth = () => {
    chrome.identity.launchWebAuthFlow(configOAuth, redirectUrl => {
        console.log(redirectUrl);
        return redirectUrl;
    });
};

export const getChannelList = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", channelListUrl, true)
    xhr.onload = () => {
        const response= JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(response);
        } else {
            console.error(response);
        }
    }
    xhr.send(null);
    }
}

export default OAuth;