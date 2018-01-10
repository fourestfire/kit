import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  SegmentedControlIOS,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import moment from 'moment';
import Header from './Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInputMask} from 'react-native-masked-text';
import Mixpanel from 'react-native-mixpanel';
import ModalDropdown from 'react-native-modal-dropdown';
import FrequencyModal from './FrequencyModal';
import { convertTextToFrequency, convertFrequencyToText, isDeviceSmall, convertFrequencyToIndex } from '../utils/utils';

class AddContact extends Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      showFrequencyModal: false,
      fullName: '',
      id: 9000,
      phoneNum: '',
      color: 'None',
      frequency: 14,
      lastMsg: 'hi',
      notes: 'hello',
    };
  }

  _onPhoneTextSubmit() {
    let phoneNum = this.refs['2'].getRawValue();
    // console.log('phonenum', phoneNum, typeof(phoneNum));
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
		this.refs['2'].getElement().focus();
  }

  setColor(color) {
    if (color === 'Purple') this.setState({color: 'Group 1'});
    else if (color === 'Teal') this.setState({color: 'Group 2'});
    else if (color === 'Green') this.setState({color: 'Group 3'});
    else if (color === 'None') this.setState({color: 'None'});
  }

  addContact(contact) {
    Mixpanel.trackWithProperties('Contact Added', {method: 'manually'});
    Mixpanel.track('Manual Add Used');
    this.props.addContact(contact);
    this.props.navigation.navigate('Today')
  }

  toggleFrequencyModal = () => {
    this.setState({ showFrequencyModal: !this.state.showFrequencyModal });
  }

  onCustomFrequencyUpdated = (frequency) => {
    console.log('this is the selected custom freq', frequency)
    this.setState({frequency: frequency});
  }

  render() {
    const date = parseInt(moment().format('x'), 10);

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>

        <Header
          leftOnPress={() => this.props.navigation.goBack(null)}
          leftText='BACK'
          title='add contact'
        />

        <Modal
          visible={this.state.showFrequencyModal}
          onRequestClose={this.toggleFrequencyModal}
          animationType='slide'
        >
          <FrequencyModal screenProps={{ toggle: this.toggleFrequencyModal, freqUpdated: this.onCustomFrequencyUpdated }} />
        </Modal>

        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />

        <View style={styles.flexWrap}>
          <TouchableOpacity
            style={[styles.actionButton, styles.long]}
            backgroundColor='black'
            onPress={this.addContact.bind(this, {
              fullName: this.state.fullName,
              frequency: Number(this.state.frequency),
              nextContact: date,
              lastContact: null,
              lastMsg: 'N/A',
              phoneNum: this.state.phoneNum,
              color: 'None'})}
          >
            <Text style={styles.actionText}> Save New Contact </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />

        <View style={styles.flexWrap}>
          <View style={styles.textWrapper}>
            <Text style={styles.subtitle}> Full Name </Text>
            <TextInput
              style={styles.textInput}
              placeholder="John Appleseed"
              placeholderTextColor="#bfbfbf"
              autoFocus={true}
              autoCorrect={false}
              defaultValue={''}
              onChangeText={fullName => this.setState({fullName})}
              ref='1'
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => this._focusPhoneField()}
            />
          </View>
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.subtitle}> Phone Number </Text>
          <TextInputMask
            ref="2"
            style={[styles.textInput, styles.phoneInput]}
            type={'custom'}
            options={{
              mask: '(999) 999-9999'
            }}
            placeholder={'(123) 456-7890'}
            placeholderTextColor="#bfbfbf"
            dataDetectorTypes="phoneNumber"
            keyboardType="numeric"
            value={this.state.phoneNum}
            onChangeText={this._onPhoneTextChange.bind(this)}
            returnKeyType="next"
            onSubmitEditing={() => {
              this._onPhoneTextSubmit();
              // this._focusNextField('3');
              }
            }
          />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.subtitle}> Contact Frequency </Text>
          <ModalDropdown
            options={['Weekly', 'Bi-Weekly', 'Every 3 weeks', 'Monthly', 'Bi-Monthly', 'Quarterly', 'Bi-Annually', 'Custom']}
            style={{marginTop: 14}}
            textStyle={{fontSize: 18, color: 'black'}}
            dropdownStyle={{marginTop: 3, backgroundColor: 'white', borderWidth: 1, borderColor: 'grey'}}
            dropdownTextStyle={{fontSize: 16, color: 'black'}}
            dropdownTextHighlightStyle={{backgroundColor: 'hsla(240, 100%, 27%, 0.35)'}}
            adjustFrame={(style) => {
              newStyle = style;
              newStyle.height = isDeviceSmall() ? style.height + 70 : style.height + 152;
              return newStyle;
            }}
            defaultIndex={3}
            defaultValue={this.state.modalDropdownText}
            onSelect={(index, value) => {
              if (value !== 'Custom') {
                // console.log('converting text to freq..', convertTextToFrequency(value))
                this.setState({frequency: convertTextToFrequency(value)})
                return convertTextToFrequency(value);
              } else {
                this.toggleFrequencyModal();
              }
            }}
          />
        </View>

        <View style={styles.segmentedWrapper}>
          <Text style={styles.subtitle}> Group </Text>
          <SegmentedControlIOS
              style={styles.segmentedControl}
              selectedIndex={3}
              values={['Purple', 'Teal', 'Green', 'None']}
              tintColor='#333'
              onValueChange={color => this.setColor(color)}
          />
        </View>

        <View style={styles.bottomSpacer} />
    </View>
    </TouchableWithoutFeedback>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { addContact } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ addContact });

export default connect(mapState, mapDispatch)(AddContact);

/* -------------------<   STYLING   >-------------------- */

import styles from '../styles/AddEditScreens';
