import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux'; //built in function to redirect to another component
import Axios from 'axios';

export default class DetailedView extends Component {
  constructor(props) {
    super(props)
    this.id = this.props.data //receiving props.data from `list-view`
    this.state = {
      currentArt: {},
    }
  }

  //getting information about the selected art piece from the database
  async componentDidMount() {
    const { data } = await Axios.get(`https://living-art-capstone.herokuapp.com/api/artwork/${this.id}`)
    this.setState({
      currentArt: data //setting the state to contain the data on the artpiece
    })
  }

  //`video` in both these cases are mp4 files
  goToVRView(video) {
    Actions.VRView(video);
  }

  goToVR360View(video) {
    Actions.VR360View(video);
  }

  render() {
    //displaying information about the selected painting
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{this.state.currentArt.name}</Text>
          <Text style={styles.artist}>By: {this.state.currentArt.artist}</Text>
          <Text style={styles.date}>{this.state.currentArt.date}</Text>
          <Text style={styles.description}>{this.state.currentArt.description}</Text>
          <Text style={styles.description}>{this.state.currentArt.location}</Text>

          <View style={styles.buttonRow}>
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
          </View>

          <Image
            source={{ uri: this.state.currentArt.imageUrl }}
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
    paddingHorizontal: 20
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    marginVertical: 20
  },
  button1: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    width: 150,
    alignSelf: 'center'
  },
  button2: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    width: 150,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#181C22',
    textAlign: 'center',
    fontSize: 16
  },
  img: {
    width: 350,
    height: 350,
    alignSelf: "center",
    paddingHorizontal: 20
  }
})
