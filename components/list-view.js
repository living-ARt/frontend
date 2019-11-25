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
        <Text style={styles.header}>Artwork available:</Text>
        <TouchableOpacity style={styles.button} onPress={this.goToARView}>
          <Text style={styles.btnText}>Open AR</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181C22',
  },
  header: {
    fontSize: 40,
    color: '#fff',
  },
  description: {
    fontSize: 20,
    color: '#fff',
  },
  button: {
    fontSize: 20,
    color: '#fff',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 30,
    borderRadius: 2
  },
  btnText: {
    fontSize: 20
  }

})
