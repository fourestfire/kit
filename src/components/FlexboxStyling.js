import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  FadeOut,
  FadeIn,
  ZoomOut,
  ZoomIn,
  ScrollDriver,
} from '@shoutem/animation';

class HelloWorld extends Component {
  render() {
    // Create new ScrollDriver that will animate animations
    // when passing through scroll positions in input range
    const driver = new ScrollDriver();
    return (
      <ScrollView {...driver.scrollViewProps}>
        <View style={style.container}>
          {/* This will fade out and zoom in on scroll position 100 */}
          <ZoomIn driver={driver} inputRange={[50, 100]} maxFactor={3}>
            <FadeOut driver={driver} inputRange={[50, 100]}>
              <Text>Good Bye</Text>
            </FadeOut>
          </ZoomIn>
          {/* This will fade in and zoom out on scroll position 200 */}
          <ZoomOut driver={driver} inputRange={[150, 200]} maxFactor={3}>
            <FadeIn driver={driver} inputRange={[150, 200]}>
              <Text>Hello</Text>
            </FadeIn>
          </ZoomOut>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    height: 800,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});


module.exports = HelloWorld
