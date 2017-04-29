import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

export default class Box extends Component {
  static navigationOptions = {
    tabBar:{
      label: 'Tab One',
      icon: ({ tintColor }) => <Icon size={ 30 } name={ 'settings' } color={ tintColor }/>
    }
  }

  render() {
    return (
      <View style={[styles.box, this.props.style]}>
        <Image
          source={require('../../img.png')}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: 30,
    width: 30,
    margin: 5,
    backgroundColor: 'lightgrey',
    borderColor: 'black',
    borderWidth: 1
  }
});
