'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroVideo,
  ViroARScene,
  ViroText,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroConstants,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      // playVideo: false
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onAnchorFound = this._onAnchorFound.bind(this)
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroARImageMarker target={"cypress"} onAnchorFound={this._onAnchorFound}>

        </ViroARImageMarker>

      </ViroARScene>
    );
  }


  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
  _onAnchorFound() {
    console.log('Anchor found')
    return <ViroVideo
      source={require('../assets/video/Cypresses.mp4')}
      loop={true}
      position={[0, 0, -7]}
      scale={[5, 3, 3]}
    />
  }
}

ViroARTrackingTargets.createTargets({
  "cypress": {
    source: require('../assets/images/cypress.jpeg'),
    orientation: "Up",
    physicalWidth: 0.1 // real world width in meters
  },
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
