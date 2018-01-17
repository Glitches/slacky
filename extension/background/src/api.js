
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChannels, hideLoginButton} from './actions/actions';

export const getChannelList = (token) => {
  slack.channels.list({ token: token }).then(channels => {
    const filteredChannels = channels.channels.filter(
      channel => {
        if (!channel.is_archived) return channel;
      });
    // console.table(filteredChannels);
    return filteredChannels;
  })
    .catch(error => console.log(error));
};

