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
  Alert,
} from 'react-native';

import Header from './Header';
import { getSettings } from '../redux/realm';
import Emoji from 'react-native-emoji';
import { getAllContacts } from '../redux/realm';
import Mixpanel from 'react-native-mixpanel';

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
          leftText='BACK'
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
              Alert.alert(
                  'Confirm Delete',
                  "Just double checking...",
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Delete', onPress: () => {try {
                      Mixpanel.trackWithProperties('Contact Deleted', {type: 'all'});

                      // remove all contacts
                      this.props.removeAllContacts();

                      // repopulate redux store with empty contacts list
                      let allContacts = Array.prototype.slice.call(getAllContacts());
                      this.props.getAllContactsSync(allContacts);

                      // navigate back to main page depending on which stack it was
                      if (this.props.navigation.state.params.parentRoute === 'Today') this.props.navigation.navigate('Today');
                      else this.props.navigation.navigate('AllContacts');

                    } catch (error) {
                      console.warn("an error occurred", error)
                    }}, style: 'destructive'},
                  ]
                );
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
import { getAllContactsSync } from '../redux/reducer';
import { removeAllContacts } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ getAllContactsSync, removeAllContacts });

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
    // backgroundColor: 'darkblue',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: maxWidth / 1.5,
    borderRadius: 5,
    alignSelf: 'center',
    borderColor: 'red', // dark blue base
    borderLeftWidth: 1.2,
    borderRightWidth: 1.2,
    borderTopWidth: 1.2,
    borderBottomWidth: 4,
    borderBottomColor: '#990000',
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
