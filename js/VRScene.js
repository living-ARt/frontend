'use strict';

import React, { Component } from 'react';

import {
  ViroScene,
  ViroVideo
} from 'react-viro';

export default class VRScene extends Component {

  constructor(props) {
    super(props);
    this.gif = this.props.sceneNavigator.viroAppProps
    this.video = this.gif.slice(0, this.gif.length - 3) + 'mp4'
    this.state = {} // Set initial state here
  }

  render() {
    return (
      <ViroScene>
        <ViroVideo
          source={{ uri: this.video }}
          loop={true}
          position={[0, 0, -1]}
          scale={[5, 3, 3]}
        />
      </ViroScene>
    );
  }
}

module.exports = VRScene;
