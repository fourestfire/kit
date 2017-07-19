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
          leftText='Back'
          title='settings'
          rightOnPress={null}
          rightText='   '
        />

        <SettingsRow
          navigate={() => this.props.navigation.navigate('SettingsHelp')}
          rowText={'Need Help?'}
        />
        <SettingsRow
          navigate={() => this.props.navigation.navigate('SettingsPushNotifications')}
          rowText={'Enable Push Notifications'}
        />
        <SettingsRow
          navigate={() => this.props.navigation.navigate('SettingsChangeMessage')}
          rowText={'Change Default Text Message'}
        />
        {/* <SettingsRow
          navigate={null}
          rowText={'Export Contact History to CSV'}
        /> */}
        <SettingsRow
          navigate={() => this.props.navigation.navigate('SettingsDeleteAll')}
          rowText={'Delete All Data'}
        />
        <SettingsRow
          navigate={() => this.props.navigation.navigate('SettingsLeaveFeedback')}
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
