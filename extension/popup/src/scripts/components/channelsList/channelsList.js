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


    

  render () {
    console.log('renderlist', this.props)
    return (
        <List>
        {this.props.channels.channels.map(channel => {
          return (
          <ListItem key={channel.id} primaryText={channel.name_normalized} onClick={() => this.sendLink} />
          )
        })
    }
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
