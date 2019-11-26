import React, { Component } from 'react';
import axios from "axios"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class ListView extends Component {
  constructor(props){
    super(props)
    this.id = this.props.data
    this.state = {
      allArtwork: []
    }
  }

  goToARView() {
    Actions.ARView();
  }

  async componentDidMount (){
    const {data} = await axios.get(`https://living-art-capstone.herokuapp.com/api/museum/${this.id}/artwork`)
    this.setState({
      allArtwork: data
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.button} onPress={this.goToARView}>
          <Text style={styles.btnText}>Open AR</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Animated Library:</Text>

        {/* this renders a list of the current art at the selected museum */}
        {this.state.allArtwork.map(currentArt => {
          return(
            <Text style={styles.body} key={currentArt.id}>{currentArt.name}</Text>
          )
        })}

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
  body: {
    fontSize: 20,
    color: '#fff',
    paddingTop: 20,
    alignSelf: 'flex-start'
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
