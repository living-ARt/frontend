'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

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
      buttonStateTag: "onTap"
    }
    this._onInitialized = this._onInitialized.bind(this)
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
  _onButtonTap() {
      this.setState({
          buttonStateTag: "onTap"
      });
  }


  render() {
    return (
<<<<<<< HEAD
      <ViroARScene onTrackingUpdated={this._onInitialized} >

        <ViroARImageMarker target={"queen"}
          onAnchorFound={
            (e) => {
              console.log('anchor:', e)
              this.setState({
                runAnimation: true,
                initialized: true,
                isTracking: true

              })
            }}
        >
          <ViroAnimatedImage
            scale={[1, 1, 1]}
            visible={this.state.runAnimation}
            opacity={0.99}
            animation={{
              name: 'animateImage',
              run: this.state.runAnimation
            }}
            rotation={[-90, 0, 0]}
            loop={true}
            source={require('../assets/video/queen.gif')}
            dragType="FixedToPlane"
          />
        </ViroARImageMarker >

        <ViroButton
          source={require("../assets/icons/play.png")}
          tapSource={require("../assets/icons/pause.png")}
          position={[0, -9, -15]}
          height={2}
          width={3}
          onTap={this._onButtonTap}
        />

        <ViroSound
          source={require("../assets/sound/cypress.m4a")}
          loop={false}
          paused={false}
          volume={1.0}
          onFinish={this.onFinishSound}
        />
        </ViroARScene>

=======
      <ViroARScene
        onTrackingUpdated={this._onInitialized} >
        {targets.map(imageTarget => {
          return (<ViroARImageMarker target={imageTarget.name}
            onAnchorFound={
              (e) => {
                console.log('anchor:', e)
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
            />
          </ViroARImageMarker >)
        })}

      </ViroARScene >
>>>>>>> 22e3b04f79ad5aaf07cb2abea8c0876196248275

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
