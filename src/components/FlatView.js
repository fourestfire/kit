import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './Header';
import Header2 from './Header2';
import AddContact from './AddContact';
import moment from 'moment';
import { convertFrequency } from '../utils/utils';

import Row from './SingleContactRow';
import Interactable from 'react-native-interactable';

class FlatView extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'All Contacts',
      icon: ({ tintColor }) => <Icon size={24} name='md-contacts' color={ tintColor }/>
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  filterContacts(contacts, query) {
    try {
      return filteredContacts = contacts.sort((a, b) => result = a.firstName > b.firstName ? 1 : -1).filter(contact => {
        return contact.firstName.match(new RegExp(query, 'i')) || contact.lastName.match(new RegExp(query, 'i'));
      })
    } catch(e) {
      console.log("received error", e)
      return [];
    }
  }

  filteredContacts() {
    return this.filterContacts(this.props.store.contacts, this.state.query)
  }

  render() {
    const physics = {
      damping: 1 - 0.7,
      tension: 300
    }

    return (
      <View style={styles.container}>


        <Header2 />

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
          keyExtractor={item => item.id}
          data={this.filteredContacts()}
          renderItem={({item}) =>

              <View style={styles.rowContent}>
                <View style={[styles.rowIcon, {backgroundColor: item.color}]} />
                <View>
                  <Text style={styles.rowTitle}>{item.firstName} {item.lastName}</Text>
                  <Text style={styles.rowSubtitle}>Prev note: {item.lastMsg} </Text>
                </View>
              </View>

        }/>

      </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(FlatView);

/* -------------------<   STYLES   >-------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  searchbar: {
    height: 40,
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 1.0,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  textInput: {
    color: 'darkgrey',
    marginLeft: 10,
    height: 40,
    backgroundColor: 'transparent'
    // backgroundColor: 'darkgrey',
  },
  flatlist: {
    backgroundColor: 'white'
  },
  rowHeader: {
    flex: 1,
    backgroundColor: 'lightgrey',
    height: 30,
    justifyContent: 'center',
    borderColor: 'darkgray',
    borderBottomWidth: 1,
  },
  rowHeaderText: {
    fontSize: 30,
    fontWeight: '200',
    marginLeft: 10,
  },
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    height: 50,
  },
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#73d4e3',
    margin: 15
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  rowSubtitle: {
    fontSize: 14,
    color: 'gray'
  },
});
