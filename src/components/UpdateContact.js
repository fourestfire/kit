import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInputMask} from 'react-native-masked-text';
import styles from '../styles/AddEditScreens';

class UpdateContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      id: 9000,
      phoneNum: '1-212-442-5201',
      color: '#73d4e3',
      frequency: 7,
      lastMsg: 'hi',
      values: ['Daily',  'Weekly', 'Monthly'],
    }
  }

  componentDidMount() {
    this.setState({
      id: this.props.contact.id,
      firstName: this.props.contact.firstName,
      lastName: this.props.contact.lastName,
      phoneNum: this.props.contact.phoneNum,
      frequency: this.props.contact.frequency,
      lastMsg: this.props.contact.lastMsg,
      color: this.props.contact.color,
    });
  }

  _focusNextField(nextField) {
    this.refs[nextField].focus()
  }

  updateContact(contact) {
    this.props.updateContact(contact);
    this.props.screenProps.toggle();
  }

  render() {
    const contact = this.props.contact;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
        <TouchableOpacity onPress={this.props.screenProps.toggle} style={styles.closeButton}>
          <Icon name="ios-close" size={50} color="darkgrey" />
        </TouchableOpacity>

        <View style={styles.topSpacer} />

        <Text style={styles.headlineForEdit}> Edit Contact </Text>

        <View style={styles.textWrapper}>
          <Text style={styles.helpText}> First Name </Text>
          <TextInput
            style={styles.textInput}
            // placeholder={'First Name'}
            placeholderTextColor="#bfbfbf"
            autoFocus={false}
            autoCorrect={false}
            defaultValue={contact.firstName}
            onChangeText={firstName => this.setState({firstName})}
            ref='1'
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => this._focusNextField('2')}
          />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.helpText}> Last Name </Text>
          <TextInput
            ref='2'
            style={styles.textInput}
            placeholder={''}
            defaultValue={contact.lastName}
            autoCorrect={false}
            placeholderTextColor="#bfbfbf"
            onChangeText={lastName => this.setState({lastName})}
            returnKeyType="next"
            onSubmitEditing={() => this._focusNextField('3')}
          />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.helpText}> Phone Number </Text>
          <TextInput
            ref='3'
            style={[styles.textInput, styles.phoneInput]}
            defaultValue={contact.phoneNum}
            value={this.state.phoneNum}
            placeholderTextColor="#bfbfbf"
            placeholder=""
            keyboardType="numeric"
            onChangeText={phoneNum => this.setState({phoneNum})}
            returnKeyType="done"
          />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.helpText}> Contact Frequency (in days) </Text>
          <TextInput
            ref='4'
            style={styles.textInput}
            defaultValue={String(contact.frequency)}
            placeholderTextColor="#bfbfbf"
            placeholder=""
            keyboardType="numeric"
            onChangeText={frequency => this.setState({frequency})}
            returnKeyType="done"
          />
        </View>

        <View style={styles.bottomSpacer} />

        <TouchableOpacity
          //icon="md-checkmark"
          //iconPlacement="right"
          style={styles.actionButton}
          backgroundColor='black'
          onPress={this.updateContact.bind(this, {
                  id: this.state.id,
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  frequency: Number(this.state.frequency),
                  phoneNum: this.state.phoneNum,
                  color: this.state.color})}
        >
          <Text style={styles.actionText}> Update </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { updateContact } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ updateContact });

export default connect(mapState, mapDispatch)(UpdateContact);

