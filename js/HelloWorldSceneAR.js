'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroCamera,
  ViroText,
  ViroConstants,
} from 'react-viro';
import RNSimpleCompass from 'react-native-simple-compass';


export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    const degree_update_rate = 30; // Number of degrees changed before the callback is triggered
    RNSimpleCompass.start(degree_update_rate, (degree) => {
      console.log('You are facing', degree);
        this.setState({
            degree : 360-degree,
        });

        RNSimpleCompass.stop();
    });
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
          <ViroCamera
              position={[0, 0, 0]}
              rotation={[0, this.state.degree?this.state.degree:0, 0]}
              active={true}
          />

          <ViroText text="商店1" scale={[.5, .5, .5]} position={[this.state.x1?this.state.x1:0,0,this.state.z1?this.state.z1:-1]} style={styles.helloWorldTextStyle} />
          <ViroText text="商店2" scale={[.5, .5, .5]} position={[this.state.x2?this.state.x2:0,0,this.state.z2?this.state.z2:-1]} style={styles.helloWorldTextStyle} />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
        // x 是纬度差 y 是经度差
        const location1={
            lat: 30.5516559,
            lon: 104.0731423
        }

        const locationMe={
            lat: 30.5515323,
            lon: 104.073265
        }

        const location2={
            lat: 30.551724,
            lon: 104.0734387
        }


        this.setState({
            text : "test ready",
            z1: (locationMe.lat - location1.lat)*6700,
            x1: (locationMe.lon - location1.lon)*6700*-1,
            z2: (locationMe.lat - location2.lat)*6700,
            x2: (locationMe.lon - location2.lon)*6700*-1,
        });

    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial, PingFang SC',
    fontSize: 30,
    color: 'red',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
