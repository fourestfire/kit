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
      name: '',
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
        <View style={styles.secondContainer}>
          <TextInput
            style={styles.input}
            placeholder='Name'
            onChangeText={name=>this.setState({name})}
          />
          <TextInput
            style={styles.input}
            onChangeText={frequency=>this.setState({frequency})}
            placeholder='Frequency'
          />

          <Text style={styles.text} >
            Value: {this.state.frequency}
          </Text>
          <SegmentedControlIOS
            selectedIndex={2}
            values={this.state.values}
            tintColor='darkgrey'
            onValueChange={this._onValueChange} />

          <Button title="Submit" onPress={this.addContact.bind(this, {
            name: this.state.name,
            frequency: this.state.frequency,
            nextContact: 'today',
            lastContact: 'N/A'
          }
          )}/>
        </View>

        <TouchableOpacity onPress={this.props.screenProps.toggle} style={{
            position: 'absolute',
            paddingTop: 30,
            paddingHorizontal: 10,
            zIndex: 10
          }}>
          <Icon name="close" size={35} color="darkgrey" />
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

const styles = StyleSheet.create({
  container: {
    height: 500,
    marginTop: 30
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
});
