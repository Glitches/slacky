export const postMessage = (token, channelId) => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    const linkEncoded = encodeURIComponent(tabs[0].url);
    const urlComplete = `https://slack.com/api/chat.postMessage?token=${token}&channel=${channelId}&text=${linkEncoded}&as_user=true&unfurl_links=true&pretty=1`;
    fetch(urlComplete, options)
      .then(response => response.json())
      .then(data => console.log(data));
  });
};
