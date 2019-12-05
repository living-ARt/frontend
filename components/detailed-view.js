import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Axios from 'axios';

export default class DetailedView extends Component {
  constructor(props) {
    super(props)
    this.id = this.props.data
    this.state = {
      currentArt: {},
    }
  }

  async componentDidMount() {
    const { data } = await Axios.get(`https://living-art-capstone.herokuapp.com/api/artwork/${this.id}`)
    this.setState({
      currentArt: data
    })
  }

  goToVRView(video) {
    Actions.VRView(video);
  }

  goToVR360View(video) {
    Actions.VR360View(video);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{this.state.currentArt.name}</Text>
          <Text style={styles.artist}>By: {this.state.currentArt.artist}</Text>
          <Text style={styles.date}>{this.state.currentArt.date}</Text>
          <Text style={styles.description}>{this.state.currentArt.description}</Text>
          <Image
            source={{ uri: this.state.currentArt.imageUrl }}
            style={styles.img}
          />
          <TouchableOpacity style={styles.button1}
            onPress={() => this.goToVRView(this.state.currentArt.VRUrl)}
            underlayColor={'#68a0ff'} >

            <Text style={styles.buttonText}>View in VR</Text>
          </ TouchableOpacity>
          <TouchableOpacity style={styles.button2}
            onPress={() => this.goToVR360View(this.state.currentArt.VRUrl)}
            underlayColor={'#68a0ff'} >

            <Text style={styles.buttonText}>View in 360 VR</Text>
          </ TouchableOpacity>
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
  },
  buttonText: {
    color: '#181C22',
    textAlign: 'center',
    fontSize: 20
  },
  button1: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    width: 250,
    alignSelf: 'center',
    marginVertical: 40
  },
  button2: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    width: 250,
    alignSelf: 'center',
    marginVertical: 40
  }
})
