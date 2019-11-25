import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Main extends Component {

  goToListView() {
    Actions.ListView();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Living ARt</Text>
        <Text style={styles.description}>Description of app goes here</Text>
        <TouchableOpacity style={styles.button} onPress={this.goToListView}>
          <Text style={styles.btnText}>Get Started</Text>
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
