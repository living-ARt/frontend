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


import {
  ViroVRSceneNavigator,
} from 'react-viro'

var sharedProps = {
  apiKey: "API_KEY_HERE",
}
var InitialVRScene = require('../js/HelloWorldScene')

export default class DetailedView extends Component {
  constructor(props) {
    super(props)
    this.id = this.props.data
    this.state = {
      currentArt: {},
      sharedProps: sharedProps
    }
    //this.goToVRView = this.goToVRView.bind(this);
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.body}>Artist: {this.state.currentArt.artist}</Text>
          <Text style={styles.body}>Date: {this.state.currentArt.date}</Text>
          <Text style={styles.description}>{this.state.currentArt.description}</Text>
          <Image
            source={{ uri: this.state.currentArt.imageUrl }}
            style={styles.img}
          />
          <TouchableOpacity style={styles.buttons}
            onPress={() => this.goToVRView(this.state.currentArt.videoUrl)}
            underlayColor={'#68a0ff'} >

            <Text style={styles.buttonText}>VR</Text>
          </ TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
  // _getVRNavigator() {
  //   return (
  //     <ViroVRSceneNavigator {...this.state.sharedProps}
  //       initialScene={{ scene: InitialVRScene }} onExitViro={this._exitViro} video={this.state.currentArt.videoUrl} />
  //   );
  // }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181C22',
  },
  body: {
    fontSize: 20,
    color: '#fff',
    paddingTop: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 20
  },
  description: {
    fontSize: 16,
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
  buttons: {
    alignItems: 'center',
    paddingTop: 20,
    paddingRight: 40,
    paddingBottom: 20,
    paddingLeft: 40,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 2
  }
})
