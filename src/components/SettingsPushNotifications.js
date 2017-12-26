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

import Toast from 'react-native-toast-native';
import { toastStyle } from '../styles/global';

import Header from './Header';
import { getSettings } from '../redux/realm';
import Emoji from 'react-native-emoji';
import PushNotification from 'react-native-push-notification';
import Mixpanel from 'react-native-mixpanel';

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
        popInitialNotification: false,
        requestPermissions: true, // if false, must call PushNotificationsHandler.requestPermissions() later
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <Header
          leftOnPress={() => this.props.navigation.goBack(null)}
          leftText='BACK'
          title='push notifications'
          rightOnPress={null}
          rightText='   '
        />

        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />

        <View style={styles.helpTextView}>
          <Text style={styles.helpText}>Here, you can set a daily reminder.
          {"\n"}{"\n"}You'll get a quick push notification at the same time of when you first pressed schedule. You can set more than one! </Text>
        </View>

        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />

        <View style={styles.flexSpacer} />

        <View style={styles.flexWrap}>
          <TouchableOpacity
            style={[styles.actionButton, styles.large]}
            backgroundColor='black'
            onPress={() => {
              Mixpanel.trackWithProperties('Push Notifications', {type: 'set'});

              PushNotification.localNotificationSchedule({
                message: "time to check in with your contacts :)",
                playSound: false,
                repeatType: 'day', // repeat every minute
                date: new Date(Date.now() + (1000 * 5)) // in five seconds
              });

              Toast.show("all set! you'll receive daily notifications", Toast.SHORT, Toast.BOTTOM, toastStyle);
            }}
          >
            <Text style={styles.actionText}> Schedule Push Notifications </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />

        <View style={styles.flexWrap}>
          <TouchableOpacity
            style={[styles.actionButton, styles.large]}
            backgroundColor='black'
            onPress={() => {
              Mixpanel.trackWithProperties('Push Notifications', {type: 'removed'});
              PushNotification.cancelAllLocalNotifications();
              Toast.show('all notifications removed', Toast.SHORT, Toast.BOTTOM, toastStyle);
            }}
          >
            <Text style={styles.actionText}> Cancel All Notifications </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />
        <View style={styles.flexSpacer} />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
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
  tenSpacer: {
    height: 10,
  },

  flexSpacer: {
    flex: 1
  },

  flexWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

  helpTextView: {
    height: 50,
    width: maxWidth - 50,
    margin: 10,
  },
  helpText: {
    fontSize: 18,
    color: 'black',
    margin: -4
  },

  actionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300'
  },

  actionButton: {
    backgroundColor: 'hsla(240, 100%, 27%, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: maxWidth * 2 / 3 - 30,
    borderRadius: 5,
    borderColor: 'hsla(240, 100%, 27%, 0.9)', // dark blue base
    borderLeftWidth: 1.2,
    borderRightWidth: 1.2,
    borderTopWidth: 1.2,
    borderBottomWidth: 3,
    borderBottomColor: 'darkblue',
    marginHorizontal: 6,
  },

  large: {
    height: 60,
    width: maxWidth * 5 / 6 - 30,
  },
});
