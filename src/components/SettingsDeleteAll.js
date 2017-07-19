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

class SettingsDeleteAll extends React.Component {
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
          title='reset app data'
          rightOnPress={null}
          rightText='   '
        />

        <View style={styles.flex}>

          <View style={styles.spacer} />
          <Text style={styles.paragraph}>Are you looking to start all over? Well, you're in luck. Don't worry, this won't delete the actual contacts on your phone ... I think.</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            backgroundColor='black'
            onPress={() => {

              try {
                this.props.navigation.goBack(null);
                this.props.removeAllContacts();
              } catch (error) {
                console.warning("an error occurred", error)
              }

            }}
          >
            <Text style={styles.deleteText}> Blow it up <Emoji name=":bomb:"/> </Text>
          </TouchableOpacity>

          <View style={styles.spacer} />


        </View>

      </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { removeAllContacts } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ removeAllContacts });

export default connect(mapState, mapDispatch)(SettingsDeleteAll);

/* -------------------<   STYLING   >-------------------- */
import { maxHeight, maxWidth } from '../styles/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  paragraph: {
    margin: 16,
    fontSize: 18,
    fontWeight: '300'
  },
  deleteButton: {
    marginTop: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: maxWidth / 2,
    borderRadius: 10
  },
  deleteText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '300'
  },
  spacer: {
    flex: 1,
    height: 20,
  },
});
