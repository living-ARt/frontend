import React, { Component } from 'react';
import axios from 'axios'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
// import DetailedView from "./detailed-view"

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

  goToDetailedView(id){
    Actions.DetailedView(id)
  }

  async componentDidMount (){
    const {data} = await axios.get(`https://living-art-capstone.herokuapp.com/api/museum/${this.id}/artwork`)
    console.log(data)
    this.setState({
      allArtwork: data
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView>

        <TouchableOpacity style={styles.button} onPress={this.goToARView}>
          <Text style={styles.btnText}>Open AR</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Animated Library:</Text>
        {/* this renders a list of the current art at the selected museum */}
        {this.state.allArtwork.map(currentArt => {
          return(
            <View key={currentArt.id} style={styles.artCard}>
              <View style={styles.artCardLeft}>
                <Image source={{uri: currentArt.imageUrl}} style={styles.cardImage} />
              </View>

              <View style={styles.artCardRight}>
                <Text style={styles.cardTitle}>{currentArt.name}</Text>
                <Text style={styles.cardAuthor}>By {currentArt.artist}</Text>
                <Text style={styles.cardDate}>{currentArt.date}</Text>
                <Text onPress={() => this.goToDetailedView(currentArt.id)} style={styles.cardInfo} key={currentArt.id}>Tap for more info</Text>
              </View>

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
    backgroundColor: '#181C22',
  },
  header: {
    fontSize: 25,
    color: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
    alignSelf: 'flex-start'
  },
  button: {
    color: '#fff',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    alignSelf: 'flex-end',
    marginRight: 20
  },
  btnText: {
    color: '#181C22',
    fontSize: 18
  },
  artCard: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 2,
    backgroundColor: '#fff',
    width: '90%',
    marginHorizontal: 20
  },
  artCardLeft: {
    flex: 2
  },
  cardImage: {
    height: 140
  },
  artCardRight: {
    flex: 3,
    backgroundColor: '#fff',
    borderColor: '#181C22',
    borderWidth: 1,
    paddingHorizontal: 10,
    alignContent: 'flex-start',
    justifyContent: 'center'
  },
  cardTitle: {
    color: '#181C22',
    fontWeight: 'bold',
    fontSize: 16
  },
  cardDate: {
    color: '#181C22',
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'italic'
  },
  cardAuthor: {
    color: '#181C22',
    fontSize: 16,
    marginTop: 10,
  },
  cardInfo:{
    color: '#181C22',
    fontSize: 16,
    marginTop: 10,
  }
})
