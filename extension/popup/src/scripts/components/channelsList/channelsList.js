import React from 'react';
import { connect } from 'react-redux';

import { postLinkOnChannel } from '../../../../../background/src/actions/actions';
import { List, ListItem } from 'material-ui/List';

class ChannelsList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      channels: []
    };
  }

  // componentWillReceiveProps ( nextProps ) {
  //   if (this.props.channels.length !== 0) {
  //     this.setState(
  //       {channels: nextProps.channels}
  //     );
  //   }
  // }

  render () {
    console.log('renderlist', this.props)
    return (
        <List>
          {/* <ol>   */}
        {this.props.channels.channels.map(channel => {
          return (
        // <li>channel.name_normalized</li>
          <ListItem key={channel.id} primaryText={channel.name_normalized} onClick={() => this.sendLink} />
          )
        })
    }
    {/* </ol> */}
        </List>
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
