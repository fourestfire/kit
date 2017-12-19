import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Animated, TouchableOpacity, Dimensions, ScrollView, Platform, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
    };
  }

  render() {
     return (
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.4} onPress={this.props.navigate || null}>
          <View style={styles.row}>
            <Text style={styles.rowText}>{this.props.rowText || 'TBD Setting'}</Text>
            <View style={styles.spacer} />
            <View style={styles.forwardArrow}>
              <Icon name="ios-arrow-forward" size={30} color="grey" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowText: {
    fontSize: 19,
    color: '#333',
    marginLeft: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    height: 55,
  },
  rowHeader: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    borderColor: 'darkgray',
    borderBottomWidth: 1,
  },
  spacer: {
    flex: 1
  },
  forwardArrow: {
    marginRight: 15
  }
});
