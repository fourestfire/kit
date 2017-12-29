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
  ScrollView,
} from 'react-native';
import moment from 'moment';
import Header from './Header';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/AddEditScreens';
import { getAllContacts } from '../redux/realm';
import Mixpanel from 'react-native-mixpanel';
import DatePicker from 'react-native-datepicker';
import { getSettings } from '../redux/realm';

class UpdateContact extends Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      id: 9000,
      phoneNum: '1-212-442-5201',
      nextContact: 1,
      color: '#73d4e3',
      frequency: 14,
      lastMsg: 'hi',
      notes: 'hello',
    }
  }

  componentDidMount() {
    let contact = this.props.navigation.state.params.contact;

    this.setState({
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNum: contact.phoneNum,
      frequency: contact.frequency,
      nextContact: contact.nextContact,
      lastMsg: contact.lastMsg,
      color: contact.color,
      values: ['Group 1', 'Group 2', 'Group 3', 'None'],
      notes: contact.notes,
    });
  }

  _focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  updateContact(contact) {
    Mixpanel.track('Contact Updated');
    this.props.updateContact(contact);
    this.props.navigation.goBack(null);
  }

  initiateDeleteContact(contactID, name) {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete ${name} from this app?`,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete', onPress: () => this.deleteContact(contactID), style: 'destructive'},
      ]
    );
  }

  deleteContact(contactID) {
    Mixpanel.trackWithProperties('Contact Deleted', {type: 'one'});
    this.props.navigation.goBack(null);

    let allContacts = Array.prototype.slice.call(getAllContacts());
    this.props.getAllContactsSync(allContacts);

    this.props.removeContact(contactID);
  }

  findColorIndex() {
    let contact = this.props.navigation.state.params.contact;

    if (contact.color === 'Group 1') return 0;
    else if (contact.color === 'Group 2') return 1;
    else if (contact.color === 'Group 3') return 2;
    else if (contact.color === 'None') return 3;
  }

  setColor(color) {
    if (color === 'Purple') this.setState({color: 'Group 1'});
    else if (color === 'Teal') this.setState({color: 'Group 2'});
    else if (color === 'Green') this.setState({color: 'Group 3'});
    else if (color === 'None') this.setState({color: 'None'});
  }

  render() {
    const contact = this.props.navigation.state.params.contact;
    let contactHistory;

    if (contact.contactHistory.length > 0) { // shaves contact history length to fit within modal confines
      contactHistory = contact.contactHistory.slice().reverse();
      if (contactHistory.length >= 8) {
        contactHistory = contactHistory.slice(0, 7);
      }
    }

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>

        <Header
          leftOnPress={() => this.props.navigation.goBack(null)}
          leftText='BACK'
          title='edit contact'
        />

        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />

        <View style={styles.flexWrap}>
          <TouchableOpacity
            // note that it's also necessary to update editContact method in realm.js
            style={styles.actionButton}
            backgroundColor='black'
            onPress={this.updateContact.bind(this, {
                    id: this.state.id,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    nextContact: this.state.nextContact,
                    frequency: Number(this.state.frequency),
                    phoneNum: this.state.phoneNum,
                    color: this.state.color,
                    notes: this.state.notes
                  })}
          >
            <Text style={styles.actionText}> Update Contact </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.delete]}
            backgroundColor='black'
            onPress={this.initiateDeleteContact.bind(this, this.state.id, this.state.firstName)}
          >
            <Text style={styles.actionText}> Delete </Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.tenSpacer} />

        <View style={styles.flexWrap}>
          <View style={styles.textWrapperHalf}>
            <Text style={styles.subtitle}> First Name </Text>
            <TextInput
              style={styles.textInputHalf}
              placeholder=""
              placeholderTextColor="#bfbfbf"
              autoFocus={false}
              autoCorrect={false}
              defaultValue={contact.firstName}
              onChangeText={firstName => this.setState({firstName})}
              ref='1'
              returnKeyType="next"
              blurOnSubmit={false}
              onFocus={() => Mixpanel.track("Editing Contact Name")}
              onSubmitEditing={() => this._focusNextField('2')}
            />
          </View>

          <View style={styles.textWrapperHalf}>
            <Text style={styles.subtitle}> Last Name </Text>
            <TextInput
              ref='2'
              style={styles.textInputHalf}
              placeholder={''}
              defaultValue={contact.lastName}
              autoCorrect={false}
              placeholderTextColor="#bfbfbf"
              onChangeText={lastName => this.setState({lastName})}
              returnKeyType="next"
              onSubmitEditing={() => this._focusNextField('3')}
            />
          </View>
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.subtitle}> Phone Number </Text>
          <TextInput
            ref='5'
            style={[styles.textInput, styles.phoneInput]}
            defaultValue={contact.phoneNum}
            value={this.state.phoneNum}
            placeholderTextColor="#bfbfbf"
            placeholder=""
            onChangeText={phoneNum => {this.setState({phoneNum})}}
            returnKeyType="done"
          />
        </View>

        <View style={styles.flexWrap}>
          <View style={styles.textWrapperHalf}>
            <Text style={styles.subtitle}> {getSettings().deviceSize === 'small' ? 'Next Contact' : 'Next Contact Date'} </Text>
            <DatePicker
              style={{width: 95}}
              date={moment(this.state.nextContact)}
              mode="date"
              placeholder="select date"
              format="MM/DD/YYYY"
              minDate={moment().format('MM/DD/YYYY')}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 0,
                  borderWidth: 0,
                },
                dateText: {
                  fontSize: 18,
                  marginTop: 8,
                  marginLeft: -4
                }
              }}
              onDateChange={(nextContact) => {
                this.setState({nextContact: parseInt(moment(nextContact).format('x'), 10)})
              }}
            />
           { /* <TextInput
              ref='3'
              style={styles.textInputHalf}
              defaultValue={String(moment(contact.nextContact).format('L'))}
              placeholderTextColor="#bfbfbf"
              placeholder=""
              keyboardType="numeric"
              onChangeText={nextContact => this.setState({nextContact: parseInt(moment(nextContact).format('x'), 10)})}
              returnKeyType="done"
           /> */}
          </View>

          <View style={styles.textWrapperHalf}>
            <Text style={styles.subtitle}> {getSettings().deviceSize === 'small' ? 'Frequency' : 'Contact Frequency'} </Text>
            <TextInput
              ref='4'
              style={styles.textInputHalf}
              defaultValue={String(contact.frequency)}
              placeholderTextColor="#bfbfbf"
              placeholder=""
              keyboardType="numeric"
              onChangeText={frequency => this.setState({frequency})}
              returnKeyType="done"
            />
          </View>
        </View>

        <View style={styles.notesWrapper}>
          <Text style={[styles.subtitle, styles.subtitleForNotes]}> Notes </Text>
          <TextInput
            ref='5'
            style={styles.textInputForNotes}
            defaultValue={contact.notes}
            value={this.state.notes}
            multiline={true}
            placeholderTextColor="#bfbfbf"
            placeholder=""
            onChangeText={notes => {this.setState({notes})}}
            returnKeyType="done"
          />
        </View>

        <View style={styles.segmentedWrapper}>
          <Text style={styles.subtitle}> Group </Text>
          <SegmentedControlIOS
              style={styles.segmentedControl}
              selectedIndex={this.findColorIndex()}
              values={['Purple', 'Teal', 'Green', 'None']}
              tintColor='#333'
              onValueChange={color => this.setColor(color)}
          />
        </View>

        <View style={styles.textWrapper}>
          <View style={styles.contactHistory}>
            <Text style={styles.subtitleForHistory}> Message History </Text>

            <View style={styles.contactBorder}>
              {contact.contactHistory.length > 0
                ? contactHistory.map((el, idx) => {
                    return <Text key={idx} style={styles.historyRow}> {el.date}: {el.message} </Text>;
                  })
                : <Text style={styles.historyRow}> No contact history found </Text>
              }
            </View>
          </View>
        </View>

        </ScrollView>
      </View>
    </TouchableWithoutFeedback>

    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { getAllContactsSync, updateContact, removeContact } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ getAllContactsSync, updateContact, removeContact });

export default connect(mapState, mapDispatch)(UpdateContact);
