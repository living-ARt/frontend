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
  ViroARSceneNavigator //built in function that redirects to AR view
} from 'react-viro';

const InitialARScene = require('../js/ARScene'); //setting the initial scene for the AR view

//rendering the AR scene from when a user clicks on the `Open AR` button in `list-view`
export default class ARScene extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.data //receiving props.data from the `list-view`
  }
  render() {
    return (
      <ViroARSceneNavigator numberOfTrackedImages={1}
        initialScene={{ scene: InitialARScene }} viroAppProps={this.id} />
    )
  }
}

module.exports = ARScene
