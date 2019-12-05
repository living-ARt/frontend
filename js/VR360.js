'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroScene,
  Viro360Video,
  ViroVideo
} from 'react-viro';

export default class VR360 extends Component {

  constructor(props) {
    super(props);
    this.gif = this.props.sceneNavigator.viroAppProps
    this.video = this.gif.slice(0, this.gif.length - 3) + 'mp4'
    this.state = {} // Set initial state here
  }

  render() {
    console.log('video from vr:', this.video)
    return (

      <ViroScene>
        <Viro360Video
          source={{ uri: this.video }}
          loop={true}
          position={[0, 0, -1]}
          scale={[5, 3, 3]}
        />

      </ViroScene>
    );
  }

}



module.exports = VR360;
