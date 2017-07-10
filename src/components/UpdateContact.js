import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import {TextInputMask} from 'react-native-masked-text';

class UpdateContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNum: '1-212-442-5201',
      color: '#73d4e3',
      frequency: 7,
      lastMsg: 'hi',
      values: ['Daily',  'Weekly', 'Monthly'],
    }
  }

  componentDidMount() {
    this.setState({
      firstName: this.props.contact.firstName,
      lastName: this.props.contact.lastName,
      phoneNum: this.props.contact.phoneNum,
      frequency: this.props.contact.frequency,
      lastMsg: this.props.contact.lastMsg,
    })
  }

  _onPhoneTextSubmit() {
    let phoneNum = this.refs['3'].getRawValue()
    console.log("phonenum", phoneNum, typeof(phoneNum))
    this.setState({
      phoneNum: phoneNum,
    });
  }

  _onPhoneTextChange(text) {
    this.setState({
      phoneNum: text,
    });
  }

  _focusNextField(nextField) {
    this.refs[nextField].focus()
  }

  _focusPhoneField() {
		this.refs['3'].getElement().focus();
	}

  updateContact(contact) {
    this.props.updateContactSync(contact);
    this.props.screenProps.toggle();
  }

  render() {
    const contact = this.props.contact;
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={this.props.screenProps.toggle} style={styles.closeButton}>
        <Icon name="ios-close" size={50} color="darkgrey" />
      </TouchableOpacity>

      <Text style={styles.headline}> Edit Contact </Text>

      <View style={styles.textWrapper}>
        <TextInput
          style={styles.textInput}
          // placeholder={'First Name'}
          placeholderTextColor="#bfbfbf"
          autoFocus={true}
          defaultValue={contact.firstName}
          onChangeText={firstName=>this.setState({firstName})}
          ref='1'
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this._focusNextField('2')}
        />
      </View>

      <View style={styles.textWrapper}>
        <TextInput
          ref='2'
          style={styles.textInput}
          placeholder={'Last Name'}
          defaultValue={contact.lastName}
          placeholderTextColor="#bfbfbf"
          onChangeText={lastName=>this.setState({lastName})}
          returnKeyType="next"
          onSubmitEditing={this._focusPhoneField.bind(this)}
        />
      </View>

      <View style={styles.textWrapper}>
        <TextInputMask
          ref='3'
          style={[styles.textInput, styles.phoneInput]}
          type={'custom'}
          options={{
            mask: '(999) 999-9999'
          }}
          placeholder={'Phone #'}
          defaultValue={contact.phoneNum}
          placeholderTextColor="#bfbfbf"
          dataDetectorTypes="phoneNumber"
          keyboardType="numeric"
          value={this.state.phoneNum}
          onChangeText={this._onPhoneTextChange.bind(this)}
          returnKeyType="next"
          onSubmitEditing={() => {
            this._onPhoneTextSubmit()
            this._focusNextField('4')}
          }
        />
      </View>

       <View style={styles.textWrapper}>
        <TextInput
          ref='4'
          style={styles.textInput}
          defaultValue={String(contact.frequency)}
          placeholderTextColor="#bfbfbf"
          placeholder="Contact Frequency (in days)"
          keyboardType="numeric"
          onChangeText={frequency=>this.setState({frequency})}
          returnKeyType="done"
        />
      </View>

      <View style={styles.spacer} />

      <TouchableOpacity
        //icon="md-checkmark"
        //iconPlacement="right"
        style={styles.actionButton}
        backgroundColor='black'
        onPress={this.updateContact.bind(this, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                frequency: Number(this.state.frequency),
                lastMsg: 'N/A',
                phoneNum: this.state.phoneNum,
                color: '#73d4e3'})}
      >
        <Text style={styles.actionText}> Update </Text>
      </TouchableOpacity>



    </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { updateContactSync } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ updateContactSync });

export default connect(mapState, mapDispatch)(UpdateContact);

/* -------------------<   STYLING   >-------------------- */

import styles from '../styles/AddEditScreens';
