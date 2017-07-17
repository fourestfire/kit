import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './Header';
import AddContact from './AddContact';
import moment from 'moment';
import { convertFrequency } from '../utils/utils';
import Contacts from 'react-native-contacts';
import Checkbox from 'react-native-check-box';

import Row from './SingleContactRow';
import Interactable from 'react-native-interactable';

class ImportContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      numToImport: 0,
      originalContacts: [],
      contactsToImport: [],
    };
  }

  componentWillMount() {
    Contacts.getAllWithoutPhotos((err, contacts) => {
      if (err === 'denied'){
      } else {
        let strippedContacts = [];
        contacts.forEach(contact => {
          if (contact.phoneNumbers[0]) { // only if a phone number exists for contact, otherwise it will error
            strippedContacts.push({
              firstName: contact.givenName,
              lastName: contact.familyName,
              phoneNum: contact.phoneNumbers[0].number,
              recordID: contact.recordID
            });
          }
        });
        console.log('stripped contacts from react-native-contacts', strippedContacts);
        this.setState({originalContacts: strippedContacts});
      }
    });
  }

  renderFooter() {
    return (<TouchableOpacity
      style={styles.actionButton}
      backgroundColor="black"
      >
      <Text style={styles.actionText}> Import {this.state.numToImport} Contacts </Text>
    </TouchableOpacity>);
  }

  filterContacts(contacts, query) {
    try {
      return filteredContacts = contacts.filter(contact => {
        return contact.firstName.match(new RegExp(query, 'i')) || contact.lastName.match(new RegExp(query, 'i'));
      });
    } catch (e) {
      console.log('received error', e);
      return [];
    }
  }

  filteredContacts() {
    return this.filterContacts(this.state.originalContacts, this.state.query);
  }

  markContactForImport(index) {
    let contacts = this.state.contactsToImport; // .slice(0); to clone array taken out for performance reasons

    if (this.isMarkedForImport(index)) {
      let idxToRemove = contacts.indexOf(index);
      contacts.splice(idxToRemove, 1);
      this.setState({ contactsToImport: contacts });
      this.setState({ numToImport: --this.state.numToImport });
    } else {
      this.setState({ contactsToImport: contacts.concat([index]) });
      this.setState({ numToImport: ++this.state.numToImport });
    }
  }

  isMarkedForImport(index) {
    return this.state.contactsToImport.includes(index);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.screenProps.toggle} style={styles.closeButton}>
          <Icon name="ios-close" size={50} color="darkgrey" />
        </TouchableOpacity>

        <View style={styles.topSpacer} />

        <View style={styles.searchbar}>
          <TextInput
            style={styles.textInput}
            placeholder={'Search contacts from phone'}
            placeholderTextColor="darkgrey"
            autoCorrect={false}
            onChangeText={query => this.setState({query: query})}
            returnKeyType="search"
            blurOnSubmit={false}
          />
        </View>

        <FlatList
          style={styles.flatlist}
          keyExtractor={item => item.recordID}
          data={this.filteredContacts()}
          renderItem={({item, index}) =>
            (<TouchableOpacity onPress={this.markContactForImport.bind(this, index)}>
              <View style={this.isMarkedForImport(index) ? styles.rowContentHighlighted : styles.rowContentNormal}>
                  <Text style={styles.rowWidth}>
                    <Text style={styles.rowFirst}>{item.firstName}</Text>
                    <Text style={styles.rowLast}> {item.lastName}</Text>
                  </Text>
                  <Text style={styles.rowInfo}>{item.phoneNum}</Text>
              </View>
            </TouchableOpacity>)
            }
        />

      <TouchableOpacity
        style={styles.actionButton}
        backgroundColor="black"
      >
        <Text style={styles.actionText}> Import {this.state.numToImport} Contacts </Text>
      </TouchableOpacity>

      </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(ImportContacts);

/* -------------------<   STYLES   >-------------------- */
import { maxHeight, maxWidth } from '../styles/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 40,
  },
  searchbar: {
    height: 45,
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 1.0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    color: 'darkgrey',
    marginLeft: 10,
    height: 45,
    backgroundColor: 'transparent',
    fontSize: 15,
    // backgroundColor: 'darkgrey',
  },
  flatlist: {
    backgroundColor: 'white'
  },
  rowHeader: {
    flex: 1,
    backgroundColor: 'lightgrey',
    height: 20,
    justifyContent: 'center',
    borderColor: 'darkgray',
    borderBottomWidth: 1,
  },
  rowHeaderText: {
    fontSize: 20,
    fontWeight: '200',
    marginLeft: 10,
  },
  rowContentNormal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    height: 45,
  },
  rowContentHighlighted: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    height: 45,
    backgroundColor: 'lightblue'
  },
  rowFirst: {
    fontSize: 16,
  },
  rowLast: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  rowWidth: {
    marginLeft: 10,
    width: 180,
  },
  rowInfo: {
    fontSize: 16,
    color: 'gray',
  },

  actionButton: {
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: maxWidth,
    // alignSelf: 'flex-end',
  },
  actionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '200'
  },

  topSpacer: {
    height: 60,
  },
  closeButton: {
    height: maxHeight / 12,
    width: maxHeight / 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10
  }

});
