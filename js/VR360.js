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
    this.video = this.props.sceneNavigator.viroAppProps
    this.state = {} // Set initial state here
  }

  render() {
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
