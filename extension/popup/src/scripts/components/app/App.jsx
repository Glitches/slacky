import React, {Component} from 'react';
import {connect} from 'react-redux';
import authorize from '../../../../../background/src/actions/actions';
import './app.css';
import FlatButton from 'material-ui/FlatButton';
import Title from '../title/index';
import ChannelsList from '../channelsList/channelsList';
const slack = require('slack');
// import PreviewLink from '../previewLink/container';

const configOAuth = {
  // 'url': 'https://pure-refuge-96117.herokuapp.com/auth',
  'url': 'http://localhost:5000/auth',
  'interactive': true
};
class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.renderList = this.renderList.bind(this);
  }
  
  
  
  getChannelList(token) {
    slack.channels.list({token: token}).then( channels => {
        const filteredChannels = channels.channels.filter(
        channel => {
          if (!channel.is_archived) return channel;
        });
        console.table(filteredChannels);
        this.props.dispatch({
          type: 'GET_CHANNELS',
          channels: filteredChannels
        })
        this.props.dispatch(
          {
            type: 'HIDE_LOGIN_BUTTON'
          }
        )
      })
      .catch(error => console.log(error))
    };
  

  login () {
    chrome.identity.launchWebAuthFlow(configOAuth, redirectUrl => {
      let arr = redirectUrl.match(/\?code\=(.+)\&/);
      let token = arr[1];

      fetch(`http://localhost:5000/validate?code=${token}`)
      .then(response => response.json())
      .then(data => {
        data = JSON.parse(data);
        if (data.ok) {
          this.props.dispatch({
            type: 'AUTH_SUCCESS',
            token: data
          })
          this.getChannelList(data.access_token);
        }
      })
      .catch(err => console.error(err))
    });
  }

  renderList () {
    if (this.props.channels && this.props.channels.length !== 0) {
      return (
        <ChannelsList />
      )
    }
  }

  render() {
    console.log(this.props)
    return (this.props && this.props.channels && this.props.channels.channels.length === 0) ?
          (
            <div className="wrapper">
        <Title/>
          <FlatButton label="Login" onClick={this.login}/>
      </div>
    ) 
    :
    (
      <div className="wrapper">
          <Title />
            {/* <PreviewLink/> */}
            {this.renderList()}
        </div>
      )
  }
}




const mapStateToProps = (state) => {
  return {
    channels: state.channels,
    login: state.login
  };
};

// const mapDispatchToProps = (dispatch) => ({
//     sendLink: () => dispatch()
// })

export default connect(mapStateToProps)(App);


