'use strict';

import React, { Component } from 'react';

import { StyleSheet, TouchableHighlight, Text, View, Image } from 'react-native';

import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroConstants,
  ViroARTrackingTargets,
  ViroARPlane,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroAnimatedImage,
  ViroAnimations,
  ViroNode,
  ViroButton,
  ViroSound

} from 'react-viro';

const targets = [{ name: "cypress", url: require('../assets/video/cypress.gif') }, { name: 'queen', url: require('../assets/video/queen.gif') }]

export class HelloWorldSceneAR extends Component {
  constructor() {
    super()
    this.state = {
      isTracking: false,
      initialized: false,
      runAnimation: false,
      audioPaused: true
    }
    this._onInitialized = this._onInitialized.bind(this)
    this._onClick = this._onClick.bind(this)
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
  _onClick() {
    console.log("image clicked!");
    // this.setState({
    //   audioPaused: false
    // })
  }

  render() {
    return (
      // <View>
        <ViroARScene
        onTrackingUpdated={this._onInitialized} >
        {targets.map(imageTarget => {
          return (
            <ViroARImageMarker target={imageTarget.name}
              onAnchorFound={
                (e) => {
                  this.setState({
                    runAnimation: true,
                    initialized: true,
                    isTracking: true
                  })
                }}
            >

            <ViroAnimatedImage
              resizeMode={'StretchToFill'}
              scale={[0.1, 0.1, 0]}
              visible={this.state.runAnimation}
              opacity={0.99}
              animation={{
                name: 'animateImage',
                run: this.state.runAnimation,
                loop: true,
              }}
              loop={true}
              rotation={[-90, 0, 0]}
              source={imageTarget.url}
              dragType="FixedToPlane"
              onClick={this._onClick}
            />

            <ViroSound
              source={require("../assets/sound/cypress.m4a")}
              loop={false}
              paused={this.state.audioPaused}
              volume={1.0}
            />

            </ViroARImageMarker >
          )
        })}

      </ViroARScene >

    );
  }

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      isTracking: true
    } else if (state == ViroConstants.TRACKING_NONE) {
      isTracking: false
    }
  }
}


ViroARTrackingTargets.createTargets({
  "cypress": {
    name: 'cypress',
    source: require('../assets/images/cypress.jpg'),
    orientation: "Up",
    type: 'Image',
    physicalWidth: .1 // real world width in meters
  },
  "queen": {
    name: 'queen',
    source: require('../assets/images/cypress.jpg'),
    orientation: "Up",
    type: 'Image',
    physicalWidth: .1 // real world width in meters
  },

});
ViroAnimations.registerAnimations({
  animateImage: {
    properties: {
      opacity: 1.0
    },
    duration: 5000
  },
});



module.exports = HelloWorldSceneAR;
