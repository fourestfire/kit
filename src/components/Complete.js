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
import { getSettings, setFinishedToday } from '../redux/realm';
import Toast from 'react-native-toast-native';
import { toastStyle } from '../styles/global';
import Mixpanel from 'react-native-mixpanel';

class Complete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'N/A',
    };
  }

  updateContact(contact) {
    this.props.updateContact(contact);
    this.props.screenProps.toggle();
    Mixpanel.track('Contact Talked To');

    // wait until modal disappears to show toast
    // optionally can use getSettings().finishedToday to only show this toast once a day
    setTimeout(() => {
      if (this.props.store.contacts.filter(el => moment(el.nextContact).isSameOrBefore(moment(), 'day')).length === 0 && this.props.store.contacts.length > 0) {
        Toast.show("you're done for today! great job :)", Toast.LONG, Toast.BOTTOM, toastStyle);
        setFinishedToday(true);
      }
    }, 1700);
  }

  render() {
    const lastContactDate = parseInt(moment().format('x'), 10);
    const nextContactDate = parseInt(moment().add(this.props.contact.frequency, 'days').format('x'), 10); // switched from nextContactDate taking into account this.props.contact.lastContact and instead calculates from the current date
    // console.log('lastcontactdate', moment(lastContactDate).format(), 'nextcontactdate', moment(nextContactDate).format());

    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.props.screenProps.toggle} style={styles.closeButton}>
          <Icon name="ios-close" size={50} color="darkgrey" />
        </TouchableOpacity>

        <View style={styles.secondContainer}>
          <Text style={styles.text}>
            Briefly, what did you talk about with {this.props.contact.firstName} today?
          </Text>

          <View style={styles.textWrapper}>
            <TextInput
              style={styles.textInput}
              autoFocus={true}
              returnKeyType="done"
              maxLength={200}
              onChangeText={msg => this.setState({msg})}
            />
          </View>

          <Button
            title="Complete" onPress={this.updateContact.bind(this,
            Object.assign({}, this.props.contact, {
            id: this.props.contact.id,
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
import { updateContact } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ updateContact });

export default connect(mapState, mapDispatch)(Complete);

/* -------------------<   STYLING   >-------------------- */

import { maxHeight, maxWidth } from '../styles/global';
import { isIphoneX } from 'react-native-iphone-x-helper';
const marginTop = isIphoneX() ? 50 : 30;

const styles = StyleSheet.create({
  container: {
    height: 500,
    marginTop: marginTop,
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
  textWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    height: 40,
    width: maxWidth - 50,
    margin: 30,
  },
  textInput: {
    width: maxWidth - 50,
    height: 40,
  },
  closeButton: {
    height: maxHeight / 8,
    width: maxHeight / 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10
  }
});
