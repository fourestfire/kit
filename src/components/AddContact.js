import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SegmentedControlIOS,
  TouchableOpacity,
  Button,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInputMask} from 'react-native-masked-text';

import { createContact } from '../redux/realm';

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNum: '',
      color: '#73d4e3',
      frequency: 14,
      values: ['Daily',  'Weekly', 'Monthly'],
    };
  }

  _onPhoneTextSubmit() {
    let phoneNum = this.refs['3'].getRawValue();
    console.log('phonenum', phoneNum, typeof(phoneNum));
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
    this.refs[nextField].focus();
  }

  _focusPhoneField() {
		this.refs['3'].getElement().focus();
	}

  addContact(contact) {
    createContact(contact);
    this.props.addContactSync(contact);
    this.props.screenProps.toggle();
  }

  render() {
    const countryOptions = [
      {label: 'Denmark', value: 'DK'},
      {label: 'Germany', value: 'DE'},
      {label: 'United States', value: 'US'}
    ];
    const date = parseInt(moment().format('x'), 10);

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.screenProps.toggle} style={styles.closeButton}>
          <Icon name="ios-close" size={50} color="darkgrey" />
        </TouchableOpacity>

      <Text style={styles.headline}> Add Contact </Text>

      <View style={styles.textWrapper}>
        <TextInput
          ref="1"
          style={styles.textInput}
          placeholder={'First Name'}
          placeholderTextColor="#bfbfbf"
          autoFocus={true}
          onChangeText={firstName => this.setState({firstName})}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this._focusNextField('2')}
        />
      </View>

      <View style={styles.textWrapper}>
        <TextInput
          ref="2"
          style={styles.textInput}
          placeholder={'Last Name'}
          placeholderTextColor="#bfbfbf"
          onChangeText={lastName => this.setState({lastName})}
          returnKeyType="next"
          onSubmitEditing={this._focusPhoneField.bind(this)}
        />
      </View>

      <View style={styles.textWrapper}>
        <TextInputMask
          ref="3"
          style={[styles.textInput, styles.phoneInput]}
          type={'custom'}
          options={{
            mask: '(999) 999-9999'
          }}
          placeholder={'Phone #'}
          placeholderTextColor="#bfbfbf"
          dataDetectorTypes="phoneNumber"
          keyboardType="numeric"
          value={this.state.phoneNum}
          onChangeText={this._onPhoneTextChange.bind(this)}
          returnKeyType="next"
          onSubmitEditing={() => {
            this._onPhoneTextSubmit();
            this._focusNextField('4');}
          }
        />
        {/*<TextInput
          ref='3'
          style={[styles.textInput, styles.phoneInput]}
          placeholder={'Phone #'}
          placeholderTextColor="#bfbfbf"
          dataDetectorTypes="phoneNumber"
          keyboardType="phone-pad"
          onChangeText={phoneNum=>this.setState({phoneNum})}
          returnKeyType="next"
          onSubmitEditing={() => this._focusNextField('4')}
        />*/}
      </View>

      <View style={styles.textWrapper}>
        <TextInput
          ref="4"
          style={styles.textInput}
          placeholderTextColor="#bfbfbf"
          placeholder="Contact Frequency (in days)"
          keyboardType="numeric"
          onChangeText={frequency => this.setState({frequency})}
          returnKeyType="done"
        />
      </View>

      <View style={styles.spacer} />

      <TouchableOpacity
        //icon="md-checkmark"
        //iconPlacement="right"
        style={styles.actionButton}
        backgroundColor="black"
        onPress={this.addContact.bind(this, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                frequency: Number(this.state.frequency),
                nextContact: date,
                lastContact: null,
                lastMsg: 'N/A',
                phoneNum: this.state.phoneNum,
                color: '#73d4e3'})}
      >
        <Text style={styles.actionText}> Save </Text>
      </TouchableOpacity>

    </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { addContactSync, removeContactSync } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ addContactSync, removeContactSync });

export default connect(mapState, mapDispatch)(AddContact);

/* -------------------<   STYLING   >-------------------- */

import styles from '../styles/AddEditScreens';
