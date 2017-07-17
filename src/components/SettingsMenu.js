import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

/* -------------------<   COMPONENT   >-------------------- */

class SettingsMenu extends React.Component {
  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  contactContainer: {
    marginTop: 30,
    marginBottom: 30
  },

  text: {
    fontSize: 14
  },

  divider: {
    borderColor: 'lightgrey',
    borderBottomWidth: 1
  },

  contactRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgrey',
    borderBottomWidth: 1
  },

  contactKey: {
    fontWeight: 'bold',
    width: 130,
    marginLeft: 10
  },

  contactValue: {
    paddingVertical: 7,
  },

  addButton: {
    backgroundColor: 'black'
  },

  icon: {
    width: 26,
    height: 26,
  },

});

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(SettingsMenu);
