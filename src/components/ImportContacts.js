import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Dimensions, FlatList, Modal, Alert, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Contacts from 'react-native-contacts';
import SearchBar from 'react-native-search-bar';
import { randomNextContactDate } from '../utils/utils';
import Emoji from 'react-native-emoji';
import { markContactsImportedTrue } from '../redux/realm';

class ImportContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      numToImport: 0,
      originalContacts: [],
      contactsToImport: [],
      isActionConfirmed: false,
    };
  }

  componentWillMount() {
    Contacts.getAllWithoutPhotos((err, contacts) => {
      if (err === 'denied'){
        Alert.alert(
          'Enable Permission in Settings',
          "To allow KIT to access your contacts for import, please navigate to your phone's settings page. From there, go to 'keep in touch,' and then switch contacts to 'on'",
          [
            {text: 'OK', onPress: () => this.props.screenProps.toggle},
          ]
        );
      } else {
        let strippedContacts = [];
        contacts.forEach((contact, idx) => {
          if (contact.phoneNumbers[0]) { // only if a phone number exists for contact, otherwise it will error
            console.log("contact", contact, idx);
            strippedContacts.push({
              firstName: contact.givenName,
              lastName: contact.familyName,
              fullName: `${contact.givenName} ${contact.familyName}`,
              phoneNum: contact.phoneNumbers[0].number,
              recordID: contact.recordID,
              arrayIdx: idx,
              nextContact: randomNextContactDate(),
            });
          } else {
            strippedContacts.push({
              firstName: contact.givenName,
              lastName: contact.familyName,
              fullName: `${contact.givenName} ${contact.familyName}`,
              phoneNum: 'No number found',
              recordID: contact.recordID,
              arrayIdx: idx,
              nextContact: randomNextContactDate(),
            });
          }
        });
        console.log('stripped contacts from react-native-contacts', strippedContacts);
        this.setState({originalContacts: strippedContacts});
      }
    });
  }

  // renderFooter() {
  //   return (<TouchableOpacity style={styles.actionButton}>
  //             <Text style={styles.actionText}> Import {this.state.numToImport} Contacts </Text>
  //           </TouchableOpacity>);
  // }

  filterContacts(contacts, query) {
    try {
      return contacts.filter(contact => {
        return contact.fullName.match(new RegExp(query, 'i'));
      });
    } catch (e) {
      console.log('received error', e);
      return [];
    }
  }

  filteredContacts() {
    return this.filterContacts(this.state.originalContacts, this.state.query);
  }

  markContactForImport(arrayIdx) {
    // console.log('marking this idx for import', arrayIdx);
    let contacts = this.state.contactsToImport; // .slice(0); to clone array taken out for performance reasons

    if (this.isMarkedForImport(arrayIdx)) {
      let idxToRemove = contacts.indexOf(arrayIdx);
      contacts.splice(idxToRemove, 1);
      this.setState({ contactsToImport: contacts });
      this.setState({ numToImport: --this.state.numToImport });
    } else {
      this.setState({ contactsToImport: contacts.concat([arrayIdx]) });
      this.setState({ numToImport: ++this.state.numToImport });
    }
  }

  isMarkedForImport(arrayIdx) {
    // console.log('is this already marked for input?', this.state.contactsToImport, this.state.contactsToImport.includes(arrayIdx));
    return this.state.contactsToImport.includes(arrayIdx);
  }

  importContacts() {
    // if (!this.state.isActionConfirmed) { this.setState({ isActionConfirmed: true }); } // eventual confirmation logic - press twice to import instead of just once
    this.state.contactsToImport.forEach(arrayIdx => {
      this.props.addContact(this.state.originalContacts[arrayIdx]);
    });

    markContactsImportedTrue();
    this.props.screenProps.toggle();
  }

  render() {
    return (
        <View style={styles.container}>

          <TouchableOpacity onPress={this.props.screenProps.toggle} style={styles.closeButton}>
            <Icon name="ios-close" size={50} color="darkgrey" />
          </TouchableOpacity>

          <TouchableWithoutFeedback onPress={() => this.refs.searchbar.unFocus()}>
            <View style={styles.topSpacer} />
          </TouchableWithoutFeedback>

          <TouchableOpacity
            style={this.state.numToImport === 0 ? [styles.actionButton, styles.disabled] : styles.actionButton }
            disabled={this.state.numToImport === 0}
            onPress={this.importContacts.bind(this)}
            >
              <Text
                style={this.state.numToImport === 0 ? styles.actionTextDisabled : styles.actionText}> Import {this.state.numToImport} Contacts </Text>
          </TouchableOpacity>

          <View style={styles.searchbar}>
          <SearchBar
            ref='searchbar'
            showsCancelButton={false}
            placeholder='Search'
            onChangeText={query => this.setState({query: query})}
            onSearchButtonPress={() => this.refs.searchbar.unFocus()}
            onCancelButtonPress={() => {
              this.setState({ query: '' });
              this.refs.searchbar.unFocus();
            }}
            searchBarStyle={'minimal'}
          />
        </View>

          <FlatList
            style={styles.flatlist}
            keyExtractor={item => item.recordID}
            data={this.filteredContacts()}
            renderItem={({item}) =>
              (<TouchableOpacity onPress={this.markContactForImport.bind(this, item.arrayIdx)}>
                <View style={this.isMarkedForImport(item.arrayIdx) ? styles.rowContentHighlighted : styles.rowContentNormal}>
                    <Text style={styles.rowWidth}>
                      <Text style={styles.rowFirst}>{item.firstName}</Text>
                      <Text style={styles.rowLast}> {item.lastName}</Text>
                    </Text>
                    <Text style={styles.rowInfo}>{item.phoneNum}</Text>
                </View>
              </TouchableOpacity>)
              }
          />

        </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { addContact } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ addContact });

export default connect(mapState, mapDispatch)(ImportContacts);

/* -------------------<   STYLES   >-------------------- */
import { maxHeight, maxWidth } from '../styles/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 25,
  },
  searchbar: {
    width: maxWidth,
    height: maxHeight / 14,
    marginTop: 3,
    marginBottom: 5,
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
    borderColor: 'darkblue',
    height: 45,
    backgroundColor: 'hsla(240, 100%, 27%, 0.15)',
    // borderLeftWidth: 1.5,
    borderRightWidth: 5,
    // borderTopWidth: 1.5,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
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
    backgroundColor: 'hsla(240, 100%, 27%, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: maxWidth - maxWidth / 4,
    marginLeft: maxWidth / 15,
    borderRadius: 5,
    borderColor: 'hsla(240, 100%, 27%, 0.9)', // dark blue base,
    borderLeftWidth: 1.2,
    borderRightWidth: 1.2,
    borderTopWidth: 1.2,
    position: 'absolute',
    left: 0,
    top: 11,
    zIndex: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'darkblue',
    // alignSelf: 'flex-end',
  },
  disabled: {
    backgroundColor: '#f1f1f1',
    borderColor: 'grey',
    borderBottomWidth: 3,
    borderLeftWidth: 1.2,
    borderRightWidth: 1.2,
    borderTopWidth: 1.2,
    borderBottomColor: 'grey',
  },
  actionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '300'
  },
  actionTextDisabled: {
    color: 'grey',
    fontSize: 20,
    fontWeight: '300'
  },

  topSpacer: {
    height: 55,
  },
  closeButton: {
    height: maxHeight / 14,
    width: maxHeight / 14,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 3,
    top: 5,
    zIndex: 10
  }

});
