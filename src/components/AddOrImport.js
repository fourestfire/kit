import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  SegmentedControlIOS,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Header from './Header';
import { getSettings } from '../redux/realm';

class AddOrImport extends Component {
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
            title={getSettings().deviceSize === 'small' ? 'import type' : 'choose import type'}
          />

        <View style={styles.topFlex} />

        <View style={styles.flexWrap}>
          <TouchableOpacity
            style={[styles.actionButton, styles.large]}
            backgroundColor='black'
            onPress={() => this.props.navigation.navigate('ImportContactsOptions')}
          >
            <Text style={styles.actionText}> Import From Phone </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />

        <View style={styles.flexWrap}>
          <TouchableOpacity
            style={[styles.actionButton, styles.large]}
            backgroundColor='black'
            onPress={() => this.props.navigation.navigate('AddContact')}
          >
            <Text style={styles.actionText}> Add Contact Manually </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />
        <View style={styles.bottomSpacer} />
    </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { addContact } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ addContact });

export default connect(mapState, mapDispatch)(AddOrImport);

/* -------------------<   STYLING   >-------------------- */

import styles from '../styles/AddEditScreens';
