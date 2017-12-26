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
import Header from './Header';
import SettingsRow from './SettingsRow';
import Emoji from 'react-native-emoji';
import Mixpanel from 'react-native-mixpanel';

/* -------------------<   COMPONENT   >-------------------- */

class SettingsMenu extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftOnPress={() => this.props.navigation.goBack(null)}
          leftText='BACK'
          title='settings'
          rightOnPress={null}
          rightText='   '
        />

        <SettingsRow
          navigate={() => {
            this.props.navigation.navigate('SettingsHelp');
            Mixpanel.trackWithProperties('SettingsClick', {action: 'help'});
        }}
          rowText={'Need Help?'}
        />
        <SettingsRow
          navigate={() => {
            this.props.navigation.navigate('SettingsPushNotifications');
            Mixpanel.trackWithProperties('SettingsClick', {action: 'pushNotifications'});
          }}
          rowText={'Enable Push Notifications'}
        />
        <SettingsRow
          navigate={() => {
            this.props.navigation.navigate('SettingsChangeMessage');
            Mixpanel.trackWithProperties('SettingsClick', {action: 'changeMessage'});
          }}
          rowText={'Change Default Text Message'}
        />
        {/* <SettingsRow
          navigate={null}
          rowText={'Export Contact History to CSV'}
        /> */}
        <SettingsRow
          navigate={() => {
            this.props.navigation.navigate('SettingsDeleteAll');
            Mixpanel.trackWithProperties('SettingsClick', {action: 'deleteAll'});
          }}
          rowText={'Delete All Data'}
        />
        <SettingsRow
          navigate={() => {
            this.props.navigation.navigate('SettingsLeaveFeedback');
            Mixpanel.trackWithProperties('SettingsClick', {action: 'leaveFeedback'});
          }}
          rowText={'Leave Feedback'}
        />
        <View style={styles.spacer} />

        <View style={styles.footer}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  spacer: {
    flex: 1
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(SettingsMenu);
