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

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNum: '1-212-442-5201',
      color: '#73d4e3',
      frequency: 7,
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
    const date = parseInt(moment().format('x'), 10)

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.screenProps.toggle} style={styles.closeButton}>
          <Icon name="ios-close" size={50} color="darkgrey" />
        </TouchableOpacity>

      <Text> Add Details
      </Text>

      <View style={styles.textWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder={'First Name'}
          placeholderTextColor='lightgrey'
          autoFocus={true}
          onChangeText={firstName=>this.setState({firstName})}
        />
      </View>

      <View style={styles.textWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder={'Last Name'}
          placeholderTextColor='lightgrey'
          onChangeText={lastName=>this.setState({lastName})}
        />
      </View>

      <View style={styles.textWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder={'Phone #'}
          placeholderTextColor='lightgrey'
          dataDetectorTypes="phoneNumber"
          keyboardType="phone-pad"
          onChangeText={phoneNum=>this.setState({phoneNum})}
        />
      </View>

      <View style={styles.textWrapper}>
        <TextInput
          style={styles.textInput}
          placeholderTextColor='lightgrey'
          placeholder="Contact Frequency (days in between each contact)"
          keyboardType="numeric"
          onChangeText={frequency=>this.setState({frequency})}
        />
      </View>




      {/*<Form>
        <FieldsContainer>
          <Fieldset label="Add Details">
            <FormGroup>
              <Label>First Name</Label>
              <Input placeholder="John" autoFocus={true} onChangeText={firstName=>this.setState({firstName})} />
            </FormGroup>
            <FormGroup>
              <Label>Last Name</Label>
              <Input placeholder="Smith" onChangeText={lastName=>this.setState({lastName})} />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input placeholder="1-646-231-3438" dataDetectorTypes="phoneNumber" keyboardType="phone-pad" onChangeText={phoneNum=>this.setState({phoneNum})} />
            </FormGroup>
            <FormGroup>
              <Label>Contact Frequency</Label>
              <Input placeholder="Number of days in between" keyboardType="phone-pad" onChangeText={frequency=>this.setState({frequency})} />
            </FormGroup>
          </Fieldset>

        </FieldsContainer>

        <ActionsContainer>
            <Button icon="md-checkmark" iconPlacement="right" backgroundColor='black' onPress={this.addContact.bind(this, {
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              frequency: Number(this.state.frequency),
              nextContact: date,
              lastContact: null,
              lastMsg: 'N/A',
              phoneNum: this.state.phoneNum,
              color: '#73d4e3'})}>Save</Button>
        </ActionsContainer>
      </Form>*/}
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

import { maxWidth } from '../styles/global';

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


  textWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    // backgroundColor: 'lavender',
    // flexDirection: 'column',
    height: 40,
    width: maxWidth - 50,
    margin: 30,
    // flex: 1,
  },
  textInput: {
    // backgroundColor: 'ghostwhite',
    width: maxWidth - 50,
    height: 40,
    // borderColor: 'lightgray',
    // borderRadius: 4,
    // borderBottomWidth: 1,
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
