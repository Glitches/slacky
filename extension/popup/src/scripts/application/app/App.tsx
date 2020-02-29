import React, { Component } from "react";
import { connect } from "react-redux";
import "./app.css";
import FlatButton from "@material-ui/core/Button/Button";
import { Title } from "../../components/title/index";
import ChannelsList from "../../components/channelsList/channelsList";
import slack from "slack";
import PreviewLink from "../../components/previewLink/container";

export namespace App {
  export interface AppProps {
    onChange: (Action: any) => void;
    channels: {
      channels: {
        id: number;
        name_normalized: string;
      }[];
    };
  }
}

const configOAuth = {
  // 'url': 'https://pure-refuge-96117.herokuapp.com/auth',
  url: "http://localhost:5000/auth",
  interactive: true
};

const App: React.FC<App.AppProps> = props => {
  function getChannelList(token) {
    slack.channels
      .list({ token })
      .then(channels => {
        const filteredChannels = channels.channels.filter(channel => {
          if (!channel.is_archived) return channel;
        });
        // console.table(filteredChannels);
        this.props.onChange({
          type: "GET_CHANNELS",
          channels: filteredChannels
        });
        this.props.onChange({
          type: "HIDE_LOGIN_BUTTON"
        });
      })
      .catch(error => console.log(error));
  }

  function login() {
    chrome.identity.launchWebAuthFlow(configOAuth, redirectUrl => {
      const arr = redirectUrl.match(/\?code\=(.+)\&/);
      const token = arr[1];

      fetch(`http://localhost:5000/validate?code=${token}`)
        .then(response => response.json())
        .then(data => {
          data = JSON.parse(data);
          if (data.ok) {
            this.props.onChange({
              type: "AUTH_SUCCESS",
              token: data
            });
            this.getChannelList(data.access_token);
          }
        })
        .catch(err => console.error(err));
    });
  }

  function renderList() {
    if (this.props.channels) {
      return <ChannelsList />;
    }
  }

  return this.props && this.props.channels && this.props.channels.channels.length === 0 ? (
    <div className="wrapper">
      <Title />
      <FlatButton label="Login" onClick={this.login} />
    </div>
  ) : (
    <div className="wrapper">
      <Title />
      <PreviewLink />
      {this.renderList()}
    </div>
  );
};

const mapStateToProps = state => ({
  channels: state.channels,
  login: state.login
});

const mapDispatchToProps = dispatch => ({
  onChange: (action: any) => dispatch(action)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
