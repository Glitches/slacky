import React from 'react';
import { connect } from 'react-redux';
import slack from 'slack';
import './channelsList.css';

import { postLinkOnChannel } from '../../../../../background/src/actions/actions';

class ChannelsList extends React.Component {
  constructor (props) {
    super(props);
    this.postMessage = this.postMessage.bind(this);

  }


    postMessage (e, channel) {
      const id = channel.id;
      const token = this.props.login.token.access_token;
      const options = { 
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const linkEncoded = encodeURIComponent(tabs[0].url);
        const urlComplete = `https://slack.com/api/chat.postMessage?token=${token}&channel=${id}&text=${linkEncoded}&as_user=true&unfurl_links=true&pretty=1` ;
        fetch(urlComplete,options)
          .then(response => response.json())
          .then(data => console.log(data));
      });
    }

  render() {
    return (
    <div className="channelsList">
        <h2>Channels</h2>
        <ol className="simple-list">
        {this.props.channels.channels.map(channel => {
          return (
            <li key={channel.id} onClick={(e) => this.postMessage(e, channel)}>{channel.name_normalized}</li>
          )
        })
    }
        </ol>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
    channels: state.channels,
    login: state.login
  });


const mapDispatchToProps = (dispatch) => ({
  sendLink: (link) => dispatch(postLinkOnChannel(link))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsList);
