import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { isDeviceSmall } from '../utils/utils';

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

        <View style={styles.leftItem}>
          <TouchableOpacity
            accessibilityTraits="button"
            onPress={this.props.leftOnPress}
            style={styles.itemWrapper}>
            <Text style={styles.itemText}>{this.props.leftText}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.centerItem}>
          <Text style={styles.titleText}>{this.props.title || 'keep in touch'}</Text>
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

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (isIphoneX() ? 45 : 20) : 25;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;
const TITLE_SIZE = isDeviceSmall() ? 19 : 22;

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
    fontSize: 13,
    color: 'black'
  },
});
