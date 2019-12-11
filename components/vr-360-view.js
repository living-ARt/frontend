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
  ViroVRSceneNavigator, //built in function that redirects to VR view
} from 'react-viro';

const InitialVR360Scene = require('../js/VR360') //setting the initial scene for the VR 360 view

//rendering the VR scene from when a user clicks on the `Open VR 360` button in `detailed-view`
export default class VR360Scene extends Component {
  constructor(props) {
    super(props);
    this.video = this.props.data //receiving props.data from `detailed-view`

  }
  render() {
    return (
      <ViroVRSceneNavigator
        initialScene={{ scene: InitialVR360Scene }} onExitViro={this._exitViro} viroAppProps={this.video} />
    )
  }
}

module.exports = VR360Scene
