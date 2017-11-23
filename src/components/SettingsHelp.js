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
import Communications from 'react-native-communications';
import Emoji from 'react-native-emoji';

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
          leftText='BACK'
          title='learn about kit'
          rightOnPress={null}
          rightText='   '
        />


        <View style={styles.flex}>
          <Text style={styles.paragraph}>To get started, first import some contacts. Start with just a few.</Text>
          <Text style={styles.paragraph}>Each day, you should contact whoever is in the 'Today' column. Try swiping left and right on that screen. To move them out of the 'Today' column, mark them as complete.</Text>
          <Text style={styles.paragraph}>If you click edit, you'll be brought to a screen where you can tap to modify each contact's color / group, and you can change how often you want to contact them at a minimum.</Text>
          <Text style={styles.paragraph}>That's the gist of it. If you have questions, feel free to message me. <Emoji name=":dog:"/><Emoji name=":cat:"/><Emoji name=":fire:"/><Emoji name=":snowflake:"/></Text>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => Communications.textWithoutEncoding('646-531-3004', "hey man, what's with your app?")}
          >
            <Text style={styles.submitText}> ask dean a question </Text>
          </TouchableOpacity>

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
import { maxHeight, maxWidth } from '../styles/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex: {
    justifyContent: 'center',
    flex: 1,
  },
  paragraph: {
    margin: 14,
    fontSize: 16,
    fontWeight: '300'
  },
  submitButton: {
    marginTop: 40,
    // backgroundColor: 'darkblue',
    backgroundColor: 'hsla(240, 100%, 27%, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: maxWidth / 1.5,
    borderRadius: 5,
    alignSelf: 'center',
    borderColor: 'hsla(240, 100%, 27%, 0.9)', // dark blue base
    borderLeftWidth: 1.2,
    borderRightWidth: 1.2,
    borderTopWidth: 1.2,
    borderBottomWidth: 4,
    borderBottomColor: 'darkblue',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300'
  },
});
