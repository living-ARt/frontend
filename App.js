import React, { Component } from 'react';
import Main from './components/main'
import ViroSample from './components/ar-view'
import ListView from './components/list-view'
import { Router, Scene, Stack } from 'react-native-router-flux'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="Main" component={Main} title="Main"/>
          <Scene key="ARView" component={ViroSample} title="ARView"/>
          <Scene key="ListView" component={ListView} title="List"/>
        </Stack>
      </Router>
    )
  }
}

