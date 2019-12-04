import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
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
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Text style={styles.title}>{this.state.currentArt.name}</Text>
      <Text style={styles.artist}>By: {this.state.currentArt.artist}</Text>
      <Text style={styles.date}>{this.state.currentArt.date}</Text>
      <Text style={styles.description}>{this.state.currentArt.description}</Text>
      <Image
        source={{uri: this.state.currentArt.imageUrl}}
        style={styles.img}
      />
    </ScrollView>
    </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181C22',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 20
  },
  artist: {
    fontSize: 18,
    color: '#fff',
    paddingTop: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 20
  },
  date: {
    fontSize: 18,
    color: '#fff',
    paddingTop: 20,
    fontStyle: 'italic',
    paddingHorizontal: 20
  },
  description: {
    fontSize: 18,
    color: '#fff',
    paddingTop: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 10
  },
  img: {
    width: 350,
    height: 350,
    alignSelf: "center",
    paddingHorizontal: 20
  }
})
