import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Animated, TouchableOpacity, Dimensions, ScrollView, Platform } from 'react-native';
import Interactable from 'react-native-interactable';
import Row from './SingleContactRow';
import Icon from 'react-native-vector-icons/Ionicons';

export default class F8HeaderIOS extends React.Component {
  static height: number;
  props: Props;

  render() {
    const {leftItem, title, rightItem} = this.props;
    const titleColor = 'black';
    const itemsColor = 'black';

    const content = React.Children.count(this.props.children) === 0
      ? <Text style={[styles.titleText, {color: titleColor}]}>
          {title}
        </Text>
      : this.props.children;
    return (
      <View style={[styles.header, this.props.style]}>
        <View style={styles.leftItem}>
          <ItemWrapperIOS color={itemsColor} item={leftItem} />
        </View>
        <View
          accessible={true}
          accessibilityLabel={title}
          accessibilityTraits="header"
          style={styles.centerItem}>
          {content}
        </View>
        <View style={styles.rightItem}>
          <ItemWrapperIOS color={itemsColor} item={rightItem} />
        </View>
      </View>
    );
  }
}

class ItemWrapperIOS extends React.Component {
  props: {
    item: Item;
    color: string;
  };



  render() {
    const {item, color} = this.props;
    if (!item) {
      return null;
    }
    console.log(item.title, item.item)
    let content;
    const {title, icon, layout, onPress} = item;
    console.log(item.title, icon, layout, onPress)
    console.log(title, layout !== 'icon')
    if (layout !== 'icon' && title) {
              console.log('oh yeah')
      content = (
        <Text style={[styles.itemText, {color}]}>
          {title.toUpperCase()}
        </Text>
      );
    } else if (icon) {
      content = <Image source={icon} />;
    }

    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={styles.itemWrapper}>
        {content}
      </TouchableOpacity>
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
    backgroundColor: 'transparent',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
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
    color: 'white',
  },
});
