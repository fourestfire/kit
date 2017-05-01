import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  SegmentedControlIOS,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      frequency: 'Weekly',
      values: ['Daily', 'Every 3 days', 'Weekly', 'Every 2 weeks', 'Monthly'],
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
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.props.screenProps.toggle} style={styles.closeButton}>
          <Icon name="close" size={35} color="darkgrey" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder='First Name'
          onChangeText={firstName=>this.setState({firstName})}
        />

        <TextInput
          style={styles.input}
          placeholder='Last Name'
          onChangeText={lastName=>this.setState({lastName})}
        />

        <View style={{width: 400}}>
          <SegmentedControlIOS
            selectedIndex={2}
            values={this.state.values}
            tintColor='darkgrey'
            onValueChange={this._onValueChange} />
        </View>

        <Button title="Submit" onPress={this.addContact.bind(this, {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          frequency: this.state.frequency,
          nextContact: 'today',
          lastContact: null,
          prevNote: 'N/A',
          phoneNum: '1-212-351-2504',
          color: '#73d4e3',
        }
        )}/>

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
    height: 500,
    marginTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    alignSelf: 'flex-end'
    // position: 'absolute',
    // paddingTop: 30,
    // paddingHorizontal: 10,
    // zIndex: 10
  }
});
