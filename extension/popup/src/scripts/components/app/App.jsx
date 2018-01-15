import React, {Component} from 'react';
import {connect} from 'react-redux';
import authorize from '../../../../../background/src/actions/actions';
import './app.css';
import FlatButton from 'material-ui/FlatButton';
import Title from '../title/index';
import ChannelsList from '../channelsList/channelsList';
const slack = require('slack');

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
      // console.log(channels)})
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
      // console.log(redirectUrl);
      let arr = redirectUrl.match(/\?code\=(.+)\&/);
      let token = arr[1];
      // console.log(token);
      // console.log(this.props)


      fetch(`http://localhost:5000/validate?code=${token}`)
      .then(response => response.json())
      .then(data => {
        data = JSON.parse(data);
      // console.log(data);
        // console.log(data.access_token);
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
    // console.log(this.props)
    if (this.props.channels && this.props.channels.length !== 0) {
      return (
        <ChannelsList />
      )
    }
  }

  render() {
    // console.log('render', this.props);
    return (
      <div className="wrapper">
        <Title/>
          <FlatButton label="Login" onClick={this.login}/>
          {this.renderList()}
      </div>
     )
    // return (this.props.login !== undefined && this.props.login.token !== '') ?
    // (
    //   <div className="wrapper">
    //     <Title/>
    //       <FlatButton label="Login" onClick={this.login}/>
    //   </div>
    // ) 
    // :
    // (
    //     <div className="wrapper">
    //       <Title />
    //         <ChannelsList />
    //     </div>
    //   )
  }
}




const mapStateToProps = (state) => {
  return {
    channels: state.channels
    // login: state.login
  };
};

// const mapDispatchToProps = (dispatch) => ({
//     sendLink: () => dispatch()
// })

export default connect(mapStateToProps)(App);


