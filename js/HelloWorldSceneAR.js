'use strict';

import React, { Component } from 'react';


import {
  ViroVideo,
  ViroARScene,
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
      paused: true,
      visible: false
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
        <ViroVideo
          source={require('../assets/video/Cypresses.mp4')}
          loop={true}
          position={[0, 0, -7]}
          scale={[5, 3, 3]}
          animation={{ run: this.state.playVideo }}
          paused={this.state.paused}
          visible={this.state.visible}
          opacity={0.9}
        />

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
    console.log('paused before:', this.state.paused)
    this.setState({
      paused: false,
      visible: true
    })
    console.log('paused after:', this.state.paused)
  }
}

ViroARTrackingTargets.createTargets({
  "cypress": {
    source: require('../assets/images/cypress.jpeg'),
    orientation: "Up",
    physicalWidth: 0.1 // real world width in meters
  },
});



module.exports = HelloWorldSceneAR;
