import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button
} from 'react-native';

class AddContact extends Component {
  static navigationOptions = {
    title: 'add a kit',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      frequency: '',
    }
  }

  addContact(contact) {
    console.log(contact)
    this.props.addContactSync(contact)
  }

  render() {
    return (
      <View style={styles.container}>
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
        <Button title="Submit" onPress={this.addContact.bind(this, {[this.state.name]: this.state.frequency })}/>
      </View>
    );
  }
}

/* -------------------<   STYLING   >-------------------- */

const styles = StyleSheet.create({
  container: {
    height: 500,
    marginTop: 30
  },
  input: {
    backgroundColor: 'ghostwhite',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20
  },
});

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { addContactSync } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ addContactSync });

export default connect(mapState, mapDispatch)(AddContact);
