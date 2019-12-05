import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios'
import ListView from './list-view'

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
            <Image source={require('../assets/logo.png')} style={styles.logo}/>
            <Text style={styles.description}>See art like never before. Experience artwork come to life with AR.</Text>
          </View>

            <Text style={styles.choose}>Choose a museum below to get started.</Text>

          {/* map over all museums in DB */}
          {this.state.museums.map(museum => {

            return (
            <View key={museum.id}>
              { museum.active ? (
                <ImageBackground source={{uri: museum.image}} style={styles.museumContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => this.goToListView(museum.id)} >
                    <Text style={styles.btnText}>{museum.name}</Text>
                  </TouchableOpacity>
                </ImageBackground>
              ) : (
                <ImageBackground source={{uri: museum.image}} style={styles.museumContainerNotActive}>
                  <TouchableOpacity style={styles.button} activeOpacity={1}>
                    <Text style={styles.btnText}>{museum.name}</Text>
                  </TouchableOpacity>
                </ImageBackground>
              )
            }
            </View>
          )
          })}
      </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#181C22',
    paddingHorizontal: 20
  },
  top: {
    paddingTop: 50,
    marginBottom: 40,
    alignContent: 'flex-start'
  },
  logo: {
    height: 125,
    width: 125,
    resizeMode: 'contain',
    marginBottom: 15,
    alignSelf: 'flex-start',
    marginLeft: 20
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
    alignSelf: 'center',
    marginBottom: 20
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
  },
  museumContainerNotActive: {
    width: 325,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    opacity: 0.35,
    backgroundColor: 'gray',
  }

})
