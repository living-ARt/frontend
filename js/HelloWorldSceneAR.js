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
    anchorId: null,
    height: null,
    width: null,
    length: null
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
        <ViroARPlane anchorId={this.state.anchorId}
          onAnchorFound={
            (e) => {
              console.log('anchor:', e)
              this.setState({
                position: e.position,
                runAnimation: true,
                scale: e.scale,
                anchorId: e.anchorId,
                height: e.height,
                width: e.width,
                length: e.length
              })
            }}
        >

          <ViroNode key="card">
            <ViroNode
              opacity={0} position={this.state.position}
              animation={{
                name: 'animateImage',
                run: this.state.runAnimation
              }}
            >
              <ViroFlexView
                position={this.state.position}
                rotation={[0, 0, 0]}
                height={this.state.height}
                width={this.state.width}
                length={this.state.length}
              //scale={this.state.scale}
              >
                {/* <ViroFlexView
                > */}
                <ViroAnimatedImage
                  height={this.state.height}
                  width={this.state.width}
                  length={this.state.length}
                  position={this.state.position}
                  loop={true}
                  scale={this.state.scale}
                  scaleToFit={this.state.scale}
                  scaleToFill={this.state.scale}
                  source={require('../assets/video/queen.gif')}
                  dragType='FixedToPlane'
                  dragPlane={{
                    planePoint: [0, 0, 0],
                    planeNormal: [0, 0, 0],
                    maxDistance: 0
                  }}
                />
                {/* </ViroFlexView> */}
              </ViroFlexView>
            </ViroNode>
            <ViroNode opacity={0}
              scale={this.state.scale}
              scaleToFit={this.state.scale}
              scaleToFill={this.state.scale}
              dragType="FixedToPlane"
              animation={{
                name: 'animateViro',
                run: this.state.runAnimation
              }}
            >
            </ViroNode>
          </ViroNode>
        </ViroARPlane >

      </ViroNode >

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
    name: 'queen',
    source: require('../assets/images/queen.jpg'),
    orientation: "Up",
    physicalWidth: 1 // real world width in meters
  },
  "cypress": {
    name: 'cypress',
    source: require('../assets/images/cypress.jpeg'),
    orientation: "Up",
    physicalWidth: 1 // real world width in meters
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
