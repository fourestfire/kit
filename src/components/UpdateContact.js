import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SegmentedControlIOS,
  Alert,
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
      values: ['Group 1', 'Group 2', 'Group 3'],
    });
  }

  _focusNextField(nextField) {
    this.refs[nextField].focus()
  }

  updateContact(contact) {
    this.props.updateContact(contact);
    this.props.screenProps.toggle();
  }

  deleteContact(contactID) {
    Alert.alert(
          'Confirm Delete',
          "Are you sure you want to delete this contact? Note: this will not impact your actual phone contact.",
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Delete', onPress: () => console.log('Delete Pressed'), style: 'destructive'},
          ]
        );
  }

  findColorIndex() {
    console.log(this.props.contact.color);
    if (this.props.contact.color === 'purple') return 0;
    else if (this.props.contact.color === '#73d4e3') return 1;
    else if (this.props.contact.color === 'forestgreen') return 2;
  }

  setColor(color) {
    if (color === 'Purple') this.setState({color: 'purple'});
    else if (color === 'Teal') this.setState({color: '#73d4e3'});
    else if (color === 'Green') this.setState({color: 'forestgreen'});
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
          <Text style={styles.helpText}> Minimum Contact Frequency (in days) </Text>
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

        <View style={styles.segmentedWrapper}>
          <Text style={styles.helpText}> Color / Group </Text>
          <SegmentedControlIOS
              style={styles.segmentedControl}
              selectedIndex={this.findColorIndex()}
              values={['Purple', 'Teal', 'Green']}
              tintColor='#333'
              onValueChange={color => this.setColor(color)}
          />
        </View>

        <View style={styles.bottomSpacer} />

        <View style={styles.flexWrap}>

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
            <Text style={styles.actionText}> Update Contact </Text>
          </TouchableOpacity>

          <TouchableOpacity
            //icon="md-checkmark"
            //iconPlacement="right"
            style={[styles.actionButton, styles.delete]}
            backgroundColor='black'
            onPress={this.deleteContact.bind(this, this.state.id)}
          >
            <Text style={styles.actionText}> Delete </Text>
          </TouchableOpacity>
        </View>
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

