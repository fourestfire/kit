import React, { Component } from 'react';
import { View, Image, Text, findNodeHandle, StyleSheet } from 'react-native';
import { BlurView } from 'react-native-blur';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { viewRef: null };
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  render() {
    const uri = './horse.png'
    return (
      <View style={styles.container}>
        <Image source={{uri}} onLoadEnd={this.imageLoaded.bind(this)} />
        <BlurView
          style={styles.absolute}
          viewRef={this.state.viewRef}
          blurType="light"
          blurAmount={10}
        />
        <Text>Hi, I am some unblurred text</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  },
});
