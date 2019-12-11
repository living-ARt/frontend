'use strict';

import React, { Component } from 'react';
import axios from 'axios'
import {
  ViroARScene,
  ViroARTrackingTargets,
  ViroText,
  ViroFlexView,
  ViroARImageMarker,
  ViroAnimatedImage,
  ViroAnimations,
  ViroSound
} from 'react-viro';

import { StyleSheet } from 'react-native'

//helper function that creates targets necessary for anchoring
const targetCreator = (name, source_uri) => {
  let targetName = name
  let targets = {}
  targets[targetName] = {
    source: { uri: source_uri },
    orientation: 'Up',
    physicalWidth: .1
  }
  ViroARTrackingTargets.createTargets(targets)
}

export class ARScene extends Component {
  constructor(props) {
    super(props)
    this.museumId = this.props.sceneNavigator.viroAppProps
    this.state = {
      isTracking: false,
      runAnimation: false,
      audioPaused: true,
      allArtwork: [],
      soundUrl: '',
      anchorId: '',
      visibleText: false
    }
    this._onClick = this._onClick.bind(this)
  }

  //this is getting all the artwork from a selected museum
  async componentDidMount() {
    try {
      const { data } = await axios.get(`https://living-art-capstone.herokuapp.com/api/museum/${this.museumId}/artwork`)
      this.setState({
        allArtwork: data
      })
      // this is mapping through the array of artwork and creating targets for each
      this.state.allArtwork.map(painting => {
        return targetCreator(painting.name, painting.imageUrl, painting.descriptionSound)
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  //this is to toggle when the user wants to start playing sound
  _onClick(position, source) {
    this.setState({
      audioPaused: !this.state.audioPaused
    })
  }

  //will only render when the user finds a target that it can anchor to
  render() {
    const target = this.state.allArtwork.map(currentArt => {
      return { name: currentArt.name, url: { uri: currentArt.gifUrl }, soundUrl: currentArt.descriptionSound }
    })
    return (
      <ViroARScene >
        {target.map((imageTarget, idx) => {
          return (
            //this component uses image recognition to identify when a user is pointing the camera to a target object and renders ViroAnimatedImage
            <ViroARImageMarker key={idx} target={imageTarget.name}
              onAnchorFound={
                (e) => {
                  if (this.state.anchorId !== e.anchorId) {
                    this._reactInternalFiber.pendingProps.arSceneNavigator.resetARSession(true, true)
                  }
                  this.setState({
                    soundUrl: imageTarget.soundUrl,
                    runAnimation: true,
                    initialized: true,
                    isTracking: true,
                    anchorId: e.anchorId,
                    audioPaused: true,
                    visibleText: true
                  })
                }}
            >
              <ViroAnimatedImage
                resizeMode={'StretchToFill'}
                scale={[0.1, 0.1, 0]}
                visible={this.state.runAnimation}
                opacity={0.99}
                animation={{
                  name: 'animateImage',
                  run: this.state.runAnimation,
                  loop: true,
                }}
                loop={true}
                rotation={[-90, 0, 0]}
                source={imageTarget.url}
                dragType="FixedToPlane"
                onClick={this._onClick}
              />
            </ViroARImageMarker >
          )
        })}

        {/* handles text on AR view page */}
        <ViroFlexView
          style={styles.textContainer}
          height={.75}
          width={3}
          position={[0, -3, -5]}
          rotation={[0, 0, 0]}
          backgroundColor={'#00979A'}
          dragType="FixedToPlane"
          visible={this.state.visibleText}
        >

          <ViroText
            style={styles.textContainerText}
            text="Tap animation and swipe right to play and pause audio."
            textAlign="center"
            textLineBreakMode="CharWrap"
            textClipMode="None"
            color="#fff"
            height={2}
          />
        </ViroFlexView>

        {/* sound component */}
        <ViroSound
          source={{ uri: `${this.state.soundUrl}` }}
          muted={false}
          loop={false}
          paused={this.state.audioPaused}
          volume={1.0}
        />

      </ViroARScene >
    );
  }
}

ViroAnimations.registerAnimations({
  animateImage: {
    properties: {
      opacity: 1.0
    }
  },
})

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    padding: .15,
    alignSelf: 'center'
  },
  textContainerText: {
    flex: 1,
    fontFamily: "Roboto",
    fontSize: 20,
    justifyContent: 'center'
  }

})

module.exports = ARScene;
