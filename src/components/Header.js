import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Animated, TouchableOpacity, Dimensions, ScrollView, Platform, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AddContact from './AddContact';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
    };
  }

  toggleAddModal() {
    this.setState({ showAddModal: !this.state.showAddModal })
  }

  render() {
     return (
      <View style={styles.header}>
        <Modal
          visible={this.state.showAddModal}
          animationType="slide"
        >
          <AddContact screenProps={{ toggle: this.toggleAddModal.bind(this) }} />
        </Modal>

        <View style={styles.leftItem}>
          <TouchableOpacity
            accessibilityTraits="button"
            onPress={this.props.leftOnPress}
            style={styles.itemWrapper}>
            <Text style={styles.itemText}>{this.props.leftText}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.centerItem}>
          <Text style={styles.titleText}>keep in touch</Text>
        </View>

        <View style={styles.rightItem}>
          <TouchableOpacity
            accessibilityTraits="button"
            onPress={this.props.rightOnPress}
            style={styles.itemWrapper}>
            <Text style={styles.itemText}>{this.props.rightText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
  },
  header: {
    backgroundColor: 'pink',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'black',
    fontWeight: '300',
    fontSize: 20,
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemWrapper: {
    padding: 11,
  },
  itemText: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'black'
  },
});
