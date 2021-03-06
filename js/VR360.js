'use strict';

import React, { Component } from 'react';

import {
  ViroScene,
  Viro360Video,
} from 'react-viro';

export default class VR360 extends Component {

  constructor(props) {
    super(props);
    this.video = this.props.sceneNavigator.viroAppProps //this is being received from detailed view
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
