import React, { Component } from 'react';

export default class PreviewLink extends React.Component {
  constructor (props) {
    super(props);
    this.previewMessage = this.previewMessage.bind(this)
  }

  previewMessage() {
    const targetUrl = 'https://www.youtube.com/watch?v=pifOhHFhOkM'
    fetch(targetUrl)
      .then(response => response.text())
      .then(data => console.log(data))
  }

  render() {
    console.log('here')
    this.previewMessage();
    return (
      <div>
        <p>{this.previewMessage}</p>
      </div>
    )
  }
}





// const options = {
        //   method: 'GET',
        //   headers: {
        //     'Accept': 'application/json, text/plain, */*',
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   }
        // };
        // chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        //   const currentTab = tabs[0].url;
        //   fetch(currentTab)
        //     .then(response => response.json())
        //     .then(data => console.log(data));
        // });