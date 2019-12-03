import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView
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
    const { data } = await axios.get('https://living-art-capstone.herokuapp.com/api/museum/')
    this.setState({ museums: data })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.top}>
            <Text style={styles.header}>Living ARt</Text>
            <Text style={styles.description}>See art like never before. Experience artwork come to life with AR.</Text>
          </View>

            <Text style={styles.choose}>Choose a museum below to get started.</Text>

          {this.state.museums.map(museum => {
              if(museum.active === true){
                <ImageBackground key={museum.id} source={{uri: museum.image}} style={styles.museumContainer}>
                <TouchableOpacity style={styles.button} onPress={() => this.goToListView(museum.id)} >
                  <Text style={styles.btnText}>{museum.name}</Text>
                </TouchableOpacity>
              </ImageBackground>
            } else {
              <ImageBackground key={museum.id} source={{uri: museum.image}} style={styles.museumContainer}>
              <TouchableOpacity style={styles.button} >
                <Text style={styles.btnText}>Coming soon: {museum.name}</Text>
              </TouchableOpacity>
              </ImageBackground>
            }
          })

              // <ImageBackground key={museum.id} source={{uri: "https://www.metmuseum.org/-/media/images/visit/met-fifth-avenue/fifthave_teaser.jpg"}} style={styles.museumContainer}>
              //   <TouchableOpacity style={styles.button} onPress={() => this.goToListView(museum.id)} >
              //     <Text style={styles.btnText}>{museum.name}</Text>
              //   </TouchableOpacity>
              // </ImageBackground>
          })
      </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#181C22',
  },
  top: {
    paddingTop: 70,
    marginBottom: 40
  },
  header: {
    fontSize: 40,
    color: '#fff',
    marginBottom: 15,
    paddingHorizontal: 20,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 18,
    color: '#fff',
    paddingHorizontal: 20
  },
  choose: {
    fontSize: 18,
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  museumContainer: {
    width: 325,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    width: 250,
    alignSelf: 'center',
    marginVertical: 80
  },
  btnText: {
    fontSize: 18,
    color: '#181C22',
  }

})
