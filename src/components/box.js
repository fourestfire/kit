import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

export default class Box extends Component {
  render() {
    return (
      <View style={[styles.box, this.props.style]} />
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: 75,
    width: 75,
    margin: 5,
    backgroundColor: 'lightgrey',
    borderColor: 'black',
    borderWidth: 1
  }
});
