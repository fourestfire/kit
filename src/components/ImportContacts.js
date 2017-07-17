import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './Header';
import AddContact from './AddContact';
import moment from 'moment';
import { convertFrequency } from '../utils/utils';
import Contacts from 'react-native-contacts';
import Checkbox from 'react-native-check-box'

import Row from './SingleContactRow';
import Interactable from 'react-native-interactable';

class ImportContacts extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Import Contacts',
      icon: ({ tintColor }) => <Icon size={24} name='md-contacts' color={ tintColor }/>
    },
    header: {
      visible: false
    }
  }

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
      if(err === 'denied'){
      } else {
        console.log('contacts from react-native-contacts', contacts)
        this.setState({originalContacts: contacts})
      }
    })
  }

  renderFooter = () => {
    return <TouchableOpacity
      style={styles.actionButton}
      backgroundColor="black"
      >
      <Text style={styles.actionText}> Import {this.state.numToImport} Contacts </Text>
    </TouchableOpacity>
  };

  filterContacts(contacts, query) {
    try {
      return filteredContacts = contacts.filter(contact => {
        return contact.givenName.match(new RegExp(query, 'i')) || contact.familyName.match(new RegExp(query, 'i'));
      })
    } catch(e) {
      console.log("received error", e)
      return [];
    }
  }

  filteredContacts() {
    return this.filterContacts(this.state.originalContacts, this.state.query);
  }

  markContactForImport(index) {
    let contacts = this.state.contactsToImport.slice(0); // clones array

    if (contacts.includes(index)) {
      let idxToRemove = contacts.indexOf(index);
      contacts.splice(idxToRemove, 1);
      this.setState({ contactsToImport: contacts })
      this.setState({ numToImport: --this.state.numToImport })
    } else {
      this.setState({ contactsToImport: contacts.concat([index]) })
      this.setState({ numToImport: ++this.state.numToImport })
    }
  }

  render() {
    const physics = {
      damping: 1 - 0.7,
      tension: 300
    }

    return (
      <View style={styles.container}>
        <Header />

        <View style={styles.searchbar}>
          <TextInput
            style={styles.textInput}
            placeholder={'Search contacts'}
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

            <TouchableOpacity onPress={this.markContactForImport.bind(this, index)}>
              <View style={styles.rowContent}>
                  <Text style={styles.rowWidth}>
                    <Text style={styles.rowFirst}>{item.givenName}</Text>
                    <Text style={styles.rowLast}> {item.familyName}</Text>
                  </Text>
                  <Text style={styles.rowInfo}>{item.phoneNumbers[0] ? item.phoneNumbers[0].number : 'No number found'}</Text>
              </View>
            </TouchableOpacity>
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
    backgroundColor: 'white'
  },
  searchbar: {
    height: 45,
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 1.0,
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
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    height: 45,
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
    width: maxWidth
    // alignSelf: 'flex-end',
  },
  actionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '200'
  },

});
