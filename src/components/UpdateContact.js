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
      </Form>
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

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
  },
  secondContainer: {
    marginTop: 60
  },
  input: {
    backgroundColor: 'ghostwhite',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 30
  }
});
