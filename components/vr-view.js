/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';

import {
  ViroVRSceneNavigator,
} from 'react-viro';

const InitialVRScene = require('../js/VRScene');

export default class VRScene extends Component {
  constructor(props) {
    super(props);
    this.video = this.props.data
  }

  render() {
    return (
      <ViroVRSceneNavigator
        initialScene={{ scene: InitialVRScene }} onExitViro={this._exitViro} viroAppProps={this.video} />
    )
  }
}

module.exports = VRScene
