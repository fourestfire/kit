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
  TextInput,
} from 'react-native';

import Header from './Header';
import { getSettings } from '../redux/realm';
import Emoji from 'react-native-emoji';

/* -------------------<   COMPONENT   >-------------------- */

class SettingsLeaveFeedback extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftOnPress={() => this.props.navigation.goBack(null)}
          leftText='Back'
          title='learn how to use kit'
          rightOnPress={null}
          rightText='   '
        />

        <View style={styles.flex}>
          <Text style={styles.paragraph}>Hi! Thanks for helping me test this app.</Text>
          <Text style={styles.paragraph}>Hi! Thanks for helping me test this app.</Text>
          <Text style={styles.paragraph}>Hi! Thanks for helping me test this app.</Text>
        </View>

      </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(SettingsLeaveFeedback);

/* -------------------<   STYLING   >-------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    margin: 10,
    fontSize: 15
  },
});
