'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
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

} from 'react-viro';

export class HelloWorldSceneAR extends Component {

  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false,
    position: [],
    scale: [],
    anchorId: null
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
      <ViroARPlane anchorId={this.state.anchorId}>
        <ViroNode>
          <ViroARImageMarker target={"queen"}
            onAnchorFound={
              (e) => {
                console.log('anchor:', e)
                this.setState({
                  position: e.position,
                  runAnimation: true,
                  scale: e.scale,
                  anchorId: e.anchorId
                })
              }}
          >

            <ViroNode key="card">
              <ViroNode
                opacity={0} position={[0, 0, 0]}
                animation={{
                  name: 'animateImage',
                  run: this.state.runAnimation
                }}
              >
                <ViroFlexView
                  rotation={[-90, 0, 0]}
                  height={0}
                  width={0}

                >
                  <ViroFlexView
                  >
                    <ViroAnimatedImage
                      height={.1}
                      width={.1}
                      length={0.01}
                      position={this.state.position}
                      loop={true}
                      scaleToFit={this.state.scale}
                      source={require('../assets/video/queen.gif')}
                      dragType='FixedToPlane'
                      dragPlane={{
                        planePoint: [0, 0, 0],
                        planeNormal: [0, 0, 0],
                        maxDistance: 0
                      }}
                    />
                  </ViroFlexView>
                </ViroFlexView>
              </ViroNode>
              <ViroNode opacity={0} position={[0, 0, 0]}
                animation={{
                  name: 'animateViro',
                  run: this.state.runAnimation
                }}
              >
              </ViroNode>
            </ViroNode>
          </ViroARImageMarker >

        </ViroNode >
      </ViroARPlane>
    )
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {this.state.isTracking ? this.getNoTrackingUI() : this.getARScene()}
      </ViroARScene>
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
  "queen": {
    source: require('../assets/images/queen.jpg'),
    orientation: "Up",
    physicalWidth: 0.05 // real world width in meters
  }
});

ViroAnimations.registerAnimations({
  animateImage: {
    properties: {
      positionX: 0,
      opacity: 1.0
    },
    duration: 500
  },
});

module.exports = HelloWorldSceneAR;
