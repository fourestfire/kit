import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SegmentedControlIOS,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  ActionsContainer,
  Button,
  FieldsContainer,
  Fieldset,
  Form,
  FormGroup,
  Input,
  Label,
  Switch,
  Select
} from 'react-native-clean-form'

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

  _onValueChange = (frequency) => {
    this.setState({
      frequency: frequency,
    });
  };

  componentDidMount() {
    this.setState({
      firstName: this.props.contact.firstName,
      lastName: this.props.contact.lastName,
      phoneNum: this.props.contact.phoneNum,
      frequency: this.props.contact.frequency,
      lastMsg: this.props.contact.lastMsg,
    })
  }

  updateContact(contact) {
    this.props.updateContactSync(contact)
    this.props.screenProps.toggle()
  }

  render() {
    const contact = this.props.contact
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
{/*

      <Form>
        <FieldsContainer>
          <Fieldset label="Edit Details">
            <FormGroup>
              <Label>First Name</Label>
              <Input defaultValue={contact.firstName} onChangeText={firstName=>this.setState({firstName})} />
            </FormGroup>
            <FormGroup>
              <Label>Last Name</Label>
              <Input defaultValue={contact.lastName} onChangeText={lastName=>this.setState({lastName})} />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input defaultValue={contact.phoneNum} dataDetectorTypes="phoneNumber" keyboardType="phone-pad" onChangeText={phoneNum=>this.setState({phoneNum})} />
            </FormGroup>
            <FormGroup>
              <Label>Contact Frequency</Label>
              <Input defaultValue={String(contact.frequency)} keyboardType="phone-pad" onChangeText={frequency=>this.setState({frequency})} />
            </FormGroup>
            <FormGroup>
              <Label>Most Recent Message</Label>
              <Input defaultValue={contact.lastMsg} onChangeText={lastMsg=>this.setState({lastMsg})} />
            </FormGroup>
          </Fieldset>

        </FieldsContainer>

        <ActionsContainer>
            <Button icon="md-checkmark" iconPlacement="right" backgroundColor='black' onPress={this.updateContact.bind(this,
              Object.assign({}, this.props.contact, {
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              frequency: Number(this.state.frequency),
              phoneNum: this.state.phoneNum,
              color: '#73d4e3'})
            )}>Save</Button>
        </ActionsContainer>
      </Form>*/}


      <TouchableOpacity
        //icon="md-checkmark"
        //iconPlacement="right"
        style={styles.actionButton}
        backgroundColor='black'
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
import { updateContactSync } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ updateContactSync });

export default connect(mapState, mapDispatch)(UpdateContact);

/* -------------------<   STYLING   >-------------------- */

import { maxWidth } from '../styles/global';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  headline: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 33,
  },
  textWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    // backgroundColor: 'lavender',
    // flexDirection: 'column',
    height: 40,
    width: maxWidth - 75,
    margin: 10,
    // flex: 1,
  },
  textInput: {
    // backgroundColor: 'ghostwhite',
    width: maxWidth - 75,
    height: 40,
    // borderColor: 'lightgray',
    // borderRadius: 4,
    // borderBottomWidth: 1,
  },
  phoneInput: {
    color: 'blue'
  },

  actionButton: {
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: maxWidth
    // alignSelf: 'flex-end',
  },

  actionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '200'
  },

  spacer: {
    flex: 1,
  },

  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 30
  }
});
