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

/* -------------------<   COMPONENT   >-------------------- */

class SettingsHelp extends React.Component {
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
          <Text style={styles.paragraph}>Hi! Thanks for helping me test this app. To get started, first some contacts.</Text>
          <Text style={styles.paragraph}>Once you have some contacts loaded, the idea is that you should contact whoever is in the 'Today' column. Once you've reached out to the person, swipe to reveal the checkmark button on the left and mark it as complete! </Text>
          <Text style={styles.paragraph}>If you have any other questions, feel free to shoot me a note at deanguonyc@gmail.com.</Text>
        </View>

      </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(SettingsHelp);

/* -------------------<   STYLING   >-------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  paragraph: {
    margin: 10,
    fontSize: 15
  },
});
