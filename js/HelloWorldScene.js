'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroScene,
  ViroVideo,
  ViroText,
  Viro360Video,
  ViroAnimations,
  ViroAnimatedImage
} from 'react-viro';

export default class HelloWorldScene extends Component {

  constructor(props) {
    super(props);
    this.video = this.props.sceneNavigator.viroAppProps
    this.state = {} // Set initial state here
  }

  render() {
    console.log('props from vr:', this.props.sceneNavigator.viroAppProps)
    return (
      <ViroScene>
        <ViroAnimatedImage
          resizeMode={'StretchToFill'}
          // scale={[10, 10, 10]}
          position={[0, 0, -10]}
          visible={true}
          animation={{
            name: 'animateImage',
            run: true,
            loop: true,
          }}
          loop={true}
          rotation={[-90, 0, 0]}
          source={{ uri: `https://living-art-animations.s3.amazonaws.com/sunflowers_360.gif` }}
        />
      </ViroScene>
    );
  }

}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroAnimations.registerAnimations({
  animateImage: {
    properties: {
      opacity: 1.0
    }
  },
})

module.exports = HelloWorldScene;
