import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Axios from 'axios';

export default class DetailedView extends Component {
  constructor(props){
    super(props)
    this.id = this.props.data
    this.state = {
      currentArt: {}
    }
  }

  async componentDidMount(){
    const {data} = await Axios.get(`https://living-art-capstone.herokuapp.com/api/artwork/${this.id}`)
    this.setState({
      currentArt: data
    })
  }

  render(){
    return(
    <View style={styles.container}>
      <Text style={styles.body}>Artist: {this.state.currentArt.artist}</Text>
      <Text style={styles.body}>Date: {this.state.currentArt.date}</Text>
      <Text style={styles.description}>{this.state.currentArt.description}</Text>
      <Image
        source={this.state.currentArt.imageUrl}
        style={{width: 30, height: 30}}
      />
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
  description: {
    fontSize: 16,
    color: '#fff',
    paddingTop: 20,
    alignSelf: 'flex-start'
  },
})
