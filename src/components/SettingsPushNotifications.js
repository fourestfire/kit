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

import PushNotification from 'react-native-push-notification';

/* -------------------<   COMPONENT   >-------------------- */

class SettingsPushNotifications extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    }
  }

  componentDidMount() {
    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
            console.log( 'TOKEN:', token );
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification );
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: { alert: true, badge: true, sound: true },

        // Should the initial notification be popped automatically; default: true
        popInitialNotification: true,
        requestPermissions: true, // if false, must call PushNotificationsHandler.requestPermissions() later
    });
  }

  render() {
    PushNotification.localNotification({
      /* iOS and Android properties */
      title: "keep in touch", // only used in apple watch
      message: "check in with your contacts!", // (required)
      playSound: false, // (optional) default: true
      repeatType: 'minute',
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    });

    PushNotification.localNotificationSchedule({
      message: "check in with your contacts!", //
      date: new Date(Date.now() + (60 * 60 * 24 * 1000)) // in 24 hours
    });

    return (
      <View style={styles.container}>
        <Header
          leftOnPress={() => this.props.navigation.goBack(null)}
          leftText='BACK'
          title='push notifications'
          rightOnPress={null}
          rightText='   '
        />

        <View style={styles.flex}>

          <View style={styles.spacer} />
          <Text style={styles.paragraph}>Still working on this feature... <Emoji name=":pizza:"/></Text>
          {/* <TouchableOpacity
            style={styles.submitButton}
            backgroundColor='black'
            onPress={null}
          >
            <Text style={styles.submitText}> Enable Notifications </Text>
          </TouchableOpacity> */}

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

export default connect(mapState, mapDispatch)(SettingsPushNotifications);

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
    margin: 10,
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
