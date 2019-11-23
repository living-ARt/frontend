'use strict';

import React, { Component } from 'react';


import {
  ViroVideo,
  ViroARScene,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroConstants,
  ViroNode
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      isTracking: false,
      text: "Initializing AR...",
      paused: true,
      visible: false,
      initialized: false,
      position: [],
      scale: []
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onAnchorFound = this._onAnchorFound.bind(this)
    this.getARScene = this.getARScene.bind(this)
    this.getNoTrackingUI = this.getNoTrackingUI.bind(this)
  }
  getNoTrackingUI() {
    const { isTracking, initialized } = this.state;
    return (
      <ViroText text={
        initialized ? 'Initializing AR...'
          : "No Tracking"
      } />
    )
  }
  getARScene() {
    return (
      <ViroNode>
        <ViroARImageMarker target={"queen"} onAnchorFound={this._onAnchorFound}>
          <ViroVideo
            source={require('../assets/video/queen.mov')}
            loop={true}
            position={this.state.position}
            scale={this.state.scale}
            paused={this.state.paused}
            visible={this.state.visible}
            opacity={0.9}
            //scalePivot={[0, 0, 0]}
            dragType={"FixedToPlane"}
          />
        </ViroARImageMarker>

      </ViroNode>
    )
  }
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {this.state.isTracking ? this.getNoTrackingUI() : this.getARScene()}

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
  _onAnchorFound(event) {
    console.log('Anchor found')
    this.setState({
      paused: false,
      visible: true,
      position: event.position,
      scale: event.scale
    })
    console.log(event)
  }
}

ViroARTrackingTargets.createTargets({
  "queen": {
    source: require('../assets/images/queen.jpg'),
    orientation: "Up",
    physicalWidth: 1// real world width in meters
  },
});



module.exports = HelloWorldSceneAR;
