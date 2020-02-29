import React from 'react';
import { connect } from 'react-redux';
import { postLinkOnChannel } from '../../../../../background/src/actions/actions';
import { postMessage } from '../../services/postMessages';
import CircularProgress from '@material-ui/core/CircularProgress';

import './channelsList.css';

export interface ChannelsListProps {
  channels: {
    channels: {
      name_normalized: string;
      id: number;
    }[];
  };
  login: {
    token: { access_token: string };
  };
}

const ChannelsList: React.FC<ChannelsListProps> = React.memo(({ channels, login }) =>
  channels.channels ? (
    <div className='channelsList'>
      <h2>Channels</h2>
      <ol className='simple-list'>
        {channels.channels.map(channel => (
          <li key={channel.id} onClick={e => postMessage(login.token.access_token, channel.id)}>
            {channel.name_normalized}
          </li>
        ))}
      </ol>
    </div>
  ) : (
    <div>
      <CircularProgress />
    </div>
  )
);

const mapStateToProps = state => ({
  channels: state.channels,
  login: state.login
});

const mapDispatchToProps = dispatch => ({
  sendLink: link => dispatch(postLinkOnChannel(link))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsList);
