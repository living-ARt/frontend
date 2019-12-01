import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

export default class Main extends Component {

  goToListView() {
    Actions.ListView();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Living ARt</Text>
        <Text style={styles.description}>See art like never before. Experience artwork come to life with AR.</Text>

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
    paddingRight: 30,
    paddingLeft: 30
  },
  header: {
    fontSize: 40,
    color: '#fff',
  },
  description: {
    fontSize: 20,
    color: '#fff',
    marginTop: 30,
  },
  button: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 80,
    borderRadius: 2
  },
  btnText: {
    fontSize: 20,
    color: '#181C22',
  }

})
