import React, {Component} from 'react';
import {connect} from 'react-redux';
import authorize from '../../../../../background/src/actions/actions';
import './app.css';
import FlatButton from 'material-ui/FlatButton';

import Title from '../title/index';



const channelListUrl = 'https://slack.com/api/channels.list?token=xoxp-30957858775-242778740935-297975183412-fa629c31a78ee3713b41cca77d5f249e&pretty=1';
const configOAuth = {
  // 'url': 'https://pure-refuge-96117.herokuapp.com/auth',
  'url': 'http://localhost:5000/auth',
  'interactive': true
};
class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }



  getChannelList() {
  //   const    myHeaders = new Headers();
  //     const myInit = {
  //       method: 'GET',
  //       headers: myHeaders,
  //       mode: 'cors',
  //       cache: 'default'
  //     };
  // fetch(channelListUrl, myInit).then( response => {
  //     console.log(response);
  //     const filteredChannels = response.channels.filter(channel => {
  //       if (!channel.is_archived) return channel;
  //     });
  //     console.table(filteredChannels);
  //     this.props.dispatch({
  //       type: 'GET_CHANNELS',
  //       channels: JSON.stringify(filteredChannels)
  //     })
  //   })
  //   .catch( console.error(response));
  // }
    const xhr = new XMLHttpRequest();
    xhr.open("GET", channelListUrl, true)
    xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);
      if (xhr.readyState == 4 && xhr.status == "200") {
        const filteredChannels = response.channels.filter(channel => {
          if (!channel.is_archived) return channel;
        });
        console.table(filteredChannels);
        this.props.dispatch({
          type: 'GET_CHANNELS',
          channels: JSON.stringify(filteredChannels)
        })
      } else {
        console.error(response);
      }
    };
    xhr.send(null);
  };

  login () {
    chrome.identity.launchWebAuthFlow(configOAuth, redirectUrl => {
      console.log(redirectUrl);
      let arr = redirectUrl.match(/\?code\=(.+)\&/);
      let token = arr[1];
      console.log(token);
      console.log(this.props)


      fetch(`http://localhost:5000/validate?code=${token}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.props.dispatch({
          type: 'AUTH_SUCCESS',
          token: token
        })
      })
      .catch(err => console.error(err))
    });
  }

  //30957858775.298344180625.c42d1a8ceec1453a743fa217c10d924282b9b09de57247d1cc8a2bc28e9a529f

    // authorize().then(data => console.log(data));

    // if (token) this.props.dispatch({
    //   type: 'LOG_IN',
    //   token
    // });


  componentDidMount() {
    document.addEventListener('click', () => {
      // this.getChannelList();
      // this.props.dispatch({
      //   type: 'ADD_COUNT'
      // });
    });
  }

  render() {
    // console.log(this.props);
    return (
      <div className="wrapper">
      <Title/>
        <FlatButton label="Login" onClick={this.login}/>
      {/* <ChannelsList {...this.props} /> */}
      </div>
    );
  }
}




const mapStateToProps = (state) => {
  return {
    channels: state.channels
  };
};

export default connect(mapStateToProps)(App);
