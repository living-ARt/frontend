'use strict';

import React, { Component } from 'react';
import axios from 'axios'
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroConstants,
  ViroARTrackingTargets,
  ViroARPlane,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroAnimatedImage,
  ViroAnimations,
  ViroNode,
  ViroSound

} from 'react-viro';

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



// const targets = [{ name: "cypress", url: require('../assets/video/cypress.gif') }, { name: 'queen', url: require('../assets/video/queen.gif') }]

export class HelloWorldSceneAR extends Component {
  constructor(props) {
    super(props)
    this.museumId = this.props.sceneNavigator.viroAppProps
    this.state = {
      isTracking: false,
      initialized: false,
      runAnimation: false,
      audioPaused: true,
      allArtwork: []
    }
    this._onInitialized = this._onInitialized.bind(this)
    this._onClick = this._onClick.bind(this)
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get(`https://living-art-capstone.herokuapp.com/api/museum/${this.museumId}/artwork`)
      this.setState({
        allArtwork: data
      })
      this.state.allArtwork.map(painting => {
        return targetCreator(painting.name, painting.imageUrl)
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  getNoTrackingUI() {
    const { isTracking, initialized } = this.state;
    return (
      <ViroText text={
        initialized ? 'Initializing AR...'
          : "No Tracking"
      } />
    )
  }

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      isTracking: true
    } else if (state == ViroConstants.TRACKING_NONE) {
      isTracking: false
    }
  }
  _onClick(position, source) {
    this.setState({
      audioPaused: !this.state.audioPaused
    })
  }

  render() {
    const target = this.state.allArtwork.map(currentArt => {
      return { name: currentArt.name, url: { uri: currentArt.videoUrl } }
    })
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized} >
        {target.map((imageTarget, idx) => {
          return (
            <ViroARImageMarker key={idx} target={imageTarget.name}
              onAnchorFound={
                (e) => {
                  this.setState({
                    runAnimation: true,
                    initialized: true,
                    isTracking: true
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
          style={{ flexDirection: 'row', padding: .15, alignSelf: 'center' }}
          height={.80}
          width={3.25}
          position={[.5, -3, -5]}
          rotation={[0, 0, 0]}
          backgroundColor={'#00979A'}
          dragType="FixedToPlane"
        >
          <ViroText
            style={{ flex: 1, fontFamily: "Arial", fontSize: 20, justifyContent: 'center' }}
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
          source={{ uri: "https://living-art-sound.s3.us-east-2.amazonaws.com/cypressSound.m4a" }}
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
    },
    duration: 5000
  },
})



// Viro prefetch's each sound & stores it locally for quick access, asynchronously.
// ViroSound.preloadSounds({
//   "cypressSound" : "https://living-art-sound.s3.us-east-2.amazonaws.com/cypressSound.m4a"
// });


module.exports = HelloWorldSceneAR;
