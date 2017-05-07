import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

class Complete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'N/A',
    };
  }

  updateContact(contact) {
    this.props.updateContactSync(contact);
    this.props.screenProps.toggle();
  }

  render() {
    const lastContactDate = parseInt(moment().format('x'), 10);
    const nextContactDate = parseInt(moment(this.props.contact.lastContact).add(this.props.contact.frequency + 1, 'days').format('x'), 10);
    console.log(lastContactDate, nextContactDate);
    // console.log(lastContactDate, this.props.contact.frequency, this.props.contact.frequency + 1, typeof(this.props.contact.frequency))

    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.props.screenProps.toggle} style={styles.closeButton}>
          <Icon name="ios-close" size={50} color="darkgrey" />
        </TouchableOpacity>

        <View style={styles.secondContainer}>
          <Text style={styles.text}>
            Briefly, what did you talk about with {this.props.contact.firstName} today?
          </Text>

          <TextInput
            style={styles.input}
            autoFocus={true}
            onChangeText={msg => this.setState({msg})}
          />

          <Button
title="Complete" onPress={this.updateContact.bind(this,
            Object.assign({}, this.props.contact, {
            lastMsg: this.state.msg,
            nextContact: nextContactDate,
            lastContact: lastContactDate,
            })
          )} />
        </View>
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
    fontWeight: '300',
    textAlign: 'center'
  },
  input: {
    backgroundColor: 'ghostwhite',
    height: 40,
    borderColor: 'lightgray',
    borderRadius: 10,
    borderWidth: 1,
    margin: 30
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 30
  }
});
