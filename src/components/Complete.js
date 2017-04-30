import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

class Complete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'N/A',
      values: ['Daily', 'Every 3 days', 'Weekly', 'Every 2 weeks', 'Monthly'],
    }
  }

  updateContact(contact) {
    this.props.updateContactSync(contact)
    this.props.screenProps.toggle()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <Text style={styles.text}>
            (Optional) In 30 characters or less, what did you talk with {this.props.contact.name} about today?
          </Text>

          <TextInput
            style={styles.input}
            placeholder='Notes'
            onChangeText={msg=>this.setState({msg})}
          />

          <Button title="Complete" onPress={this.updateContact.bind(this,
            Object.assign({}, this.props.contact, {
            lastMsg: this.state.msg,
            nextContact: 'later',
            // lastContact: 'N/A'
            })
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
import { updateContactSync } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ updateContactSync });

export default connect(mapState, mapDispatch)(Complete);

/* -------------------<   STYLING   >-------------------- */

const styles = StyleSheet.create({
  container: {
    height: 500,
    marginTop: 30,
    backgroundColor: 'transparent'
  },
  secondContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    margin: 20,
    fontSize: 20,
    fontWeight: '300'
  },
  input: {
    backgroundColor: 'ghostwhite',
    height: 40,
    borderColor: 'lightgray',
    borderRadius: 10,
    borderWidth: 1,
    margin: 20
  },
});
