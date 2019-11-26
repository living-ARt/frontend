import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class ListView extends Component {

  goToARView() {
    Actions.ARView();
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.button} onPress={this.goToARView}>
          <Text style={styles.btnText}>Open AR</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Animated Library:</Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181C22',
    paddingRight: 30,
    paddingLeft: 30
  },
  header: {
    fontSize: 30,
    color: '#fff',
    paddingTop: 20,
    alignSelf: 'flex-start'
  },
  button: {
    fontSize: 20,
    color: '#fff',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    alignSelf: 'flex-end'
  },
  btnText: {
    color: '#181C22',
    fontSize: 20
  }

})
