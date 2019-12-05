import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';
import Main from './components/main'
import ViroSample from './components/ar-view'
import VRViroSample from './components/vr-view'
import VR360ViroSample from './components/vr-360-view'
import ListView from './components/list-view'
import DetailedView from "./components/detailed-view"
import { Router, Scene, Stack } from 'react-native-router-flux'

export default class App extends Component {
  render() {
    return (
      <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle}>
        <Stack key="root" >
          <Scene key="Main" component={Main} hideNavBar={true} />
          <Scene key="ListView" component={ListView} />
          <Scene key="ARView" component={ViroSample} />
          <Scene key="DetailedView" component={DetailedView} />
          <Scene key="VRView" component={VRViroSample} />
          <Scene key="VR360View" component={VR360ViroSample} />
        </Stack>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#181C22',
    borderBottomColor: '#181C22'
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
  },
  backBtn: {
    color: '#fff',
    paddingLeft: 20
  }

})
