import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Dimensions, FlatList, Modal, Alert, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Contacts from 'react-native-contacts';
import SearchBar from 'react-native-search-bar';
import { randomNextContactDate } from '../utils/utils';

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
        contacts.forEach(contact => {
          if (contact.phoneNumbers[0]) { // only if a phone number exists for contact, otherwise it will error
            strippedContacts.push({
              firstName: contact.givenName,
              lastName: contact.familyName,
              phoneNum: contact.phoneNumbers[0].number,
              recordID: contact.recordID,
              nextContact: randomNextContactDate(),
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
      return contacts.filter(contact => {
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

  importContacts() {
    // if (!this.state.isActionConfirmed) { this.setState({ isActionConfirmed: true }); } // eventual confirmation logic - press twice to import instead of just once
    this.state.contactsToImport.forEach(contactIdx => {
      this.props.addContact(this.state.originalContacts[contactIdx]);
    });

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

          <SearchBar
            ref='searchbar'
            showsCancelButton={true}
            placeholder='Search'
            onChangeText={query => this.setState({query: query})}
            onSearchButtonPress={() => this.refs.searchbar.unFocus()}
            onCancelButtonPress={() => {
              this.setState({ query: '' });
              this.refs.searchbar.unFocus();
            }}
            searchBarStyle={'minimal'}
          />

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
            style={this.state.numToImport === 0 ? [styles.actionButton, styles.disabled] : styles.actionButton }
            disabled={this.state.numToImport === 0}
            onPress={this.importContacts.bind(this)}
            backgroundColor="black"
          >
            { this.state.isActionConfirmed
              ? <Text style={styles.actionText}> Confirm </Text>
              : <Text style={styles.actionText}> Import {this.state.numToImport} Contacts </Text>
            }

          </TouchableOpacity>

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
  disabled: {
    backgroundColor: 'hsla(240, 100%, 27%, 0.7)',
  },
  confirmed: {
    backgroundColor: 'darkgreen',
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