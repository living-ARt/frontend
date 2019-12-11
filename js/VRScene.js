'use strict';

import React, { Component } from 'react';

import {
  ViroScene,
  ViroVideo
} from 'react-viro';

export default class VRScene extends Component {

  constructor(props) {
    super(props);
    this.video = this.props.sceneNavigator.viroAppProps //this is being received from detailed view
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
