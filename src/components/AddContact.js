import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SegmentedControlIOS,
  TouchableOpacity
} from 'react-native';
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

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNum: '1-212-442-5201',
      color: '#73d4e3',
      frequency: 'Weekly',
      values: ['Daily',  'Weekly', 'Monthly'],
    }
  }

  _onValueChange = (frequency) => {
    this.setState({
      frequency: frequency,
    });
  };

  addContact(contact) {
    this.props.addContactSync(contact)
    this.props.screenProps.toggle()
  }

  render() {
    const countryOptions = [
      {label: 'Denmark', value: 'DK'},
      {label: 'Germany', value: 'DE'},
      {label: 'United States', value: 'US'}
    ]
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={this.props.screenProps.toggle} style={styles.closeButton}>
        <Icon name="ios-close" size={50} color="darkgrey" />
      </TouchableOpacity>
      <Form>
        <FieldsContainer>
          <Fieldset label="Details">
            <FormGroup>
              <Label>First name</Label>
              <Input placeholder="First Name" autoFocus={true} onChangeText={firstName=>this.setState({firstName})} />
            </FormGroup>
            <FormGroup>
              <Label>Last name</Label>
              <Input placeholder="Last Name" onChangeText={lastName=>this.setState({lastName})} />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input placeholder="Phone #" dataDetectorTypes="phoneNumber" keyboardType="phone-pad" onChangeText={phoneNum=>this.setState({phoneNum})} />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input placeholder="Email" keyboardType="email-address" returnKeyType="next" blurOnSubmit={false} onChangeText={lastName=>this.setState({lastName})} />
            </FormGroup>
          </Fieldset>

        </FieldsContainer>

        <ActionsContainer>
            <Button icon="md-checkmark" iconPlacement="right" backgroundColor='black' onPress={this.addContact.bind(this, {
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              frequency: this.state.frequency,
              nextContact: 'today',
              lastContact: null,
              prevNote: 'N/A',
              phoneNum: '1-212-351-2504',
              color: '#73d4e3'})}>Save</Button>
        </ActionsContainer>
      </Form>
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

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
  },
  segmented: {
    width: 340
  },
  input: {
    backgroundColor: 'ghostwhite',
    height: 40,
    borderColor: 'lightgray',
    borderWidth: 1,
    margin: 20,
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 30
    // position: 'absolute',
    // paddingTop: 30,
    // paddingHorizontal: 10,
    // zIndex: 10
  }
});
