import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios'
import ListView from './list-view'

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      museums: []
    }
  }
  goToListView(id) {
    Actions.ListView(id);
  }

  async componentDidMount() {
    console.log('in component did mount')
    const { data } = await axios.get('https://living-art-capstone.herokuapp.com/api/museum/')
    console.log('data:', data)
    this.setState({ museums: data })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Living ARt</Text>
        <Text style={styles.description}>See art like never before. Experience artwork come to life with AR.</Text>
        {this.state.museums.map(museum => {
          return (<TouchableOpacity style={styles.button} key={museum.id} onPress={() => this.goToListView(museum.id)} >
            <Text style={styles.btnText}>{museum.name}</Text>
          </TouchableOpacity>)
        })}

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
