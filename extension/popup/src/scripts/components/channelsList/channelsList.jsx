import React from "react";
import { connect } from "react-redux";
import { postLinkOnChannel } from "../../../../../background/src/actions/actions";
import { postMessage } from "../../services/postMessages";
import "./channelsList.css";

const ChannelsList = React.memo(props =>
  channels.channels ? (
    <div className="channelsList">
      <h2>Channels</h2>
      <ol className="simple-list">
        {props.channels.channels.map(channel => (
          <li key={channel.id} onClick={e => postMessage(props.login.token.access_token, channel.id)}>
            {channel.name_normalized}
          </li>
        ))}
      </ol>
    </div>
  ) : (
    <p>...Loading</p>
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
