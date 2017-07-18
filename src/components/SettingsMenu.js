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

import PushNotification from 'react-native-push-notification';

/* -------------------<   COMPONENT   >-------------------- */

class SettingsMenu extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  }

  render() {
    PushNotification.localNotification({
      /* iOS and Android properties */
      title: "keep in touch", // only used in apple watch
      message: "check in with your contacts!", // (required)
      playSound: false, // (optional) default: true
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    });

    return (
      <View style={styles.container}>
        <Header
          leftOnPress={() => this.props.navigation.goBack(null)}
          leftText='Back'
          title='settings'
          rightOnPress={null}
          rightText='   '
        />

        <SettingsRow
          navigate={null}
          rowText={'Need Help?'}
        />
        <SettingsRow
          navigate={null}
          rowText={'Set Push Notifications'}
        />
        <SettingsRow
          navigate={null}
          rowText={'Change Group Colors'}
        />
        <SettingsRow
          navigate={null}
          rowText={'Change Default Text Message'}
        />
        <SettingsRow
          navigate={null}
          rowText={'Export Data to CSV'}
        />
        <SettingsRow
          navigate={null}
          rowText={'Leave Feedback'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(SettingsMenu);
