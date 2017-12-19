import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Header from './Header';
import moment from 'moment';
import { convertFrequency, convertColor } from '../utils/utils';
import AddContact from './AddContact';
import UpdateContact from './UpdateContact';
import ImportContacts from './ImportContacts';

import Row from './SingleContactRow';
import Interactable from 'react-native-interactable';

import { NavigationActions } from 'react-navigation';
import { getSettings } from '../redux/realm';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class FlatView extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Manage Contacts',
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
      showImportModal: false,
    };
  }

  filterContacts(contacts, query) {
    try {
      return filteredContacts = contacts.filter(contact => {
        return contact.fullName.match(new RegExp(query, 'i'));
      }).sort((a, b) => result = a.firstName > b.firstName ? 1 : -1)
    } catch(e) {
      console.log("received error", e);
      return [];
    }
  }

  filteredContacts() {
    return this.filterContacts(this.props.store.contacts, this.state.query);
  }

  toggleImportModal = () => {
    this.setState({ showImportModal: !this.state.showImportModal });
    // if (this.state.showImportModal && contactsWereImported) this.props.navigation.goBack(null);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftOnPress={() => this.props.navigation.goBack(null)}
          leftText='BACK'
          title='all contacts'
          rightOnPress={() => this.props.navigation.navigate('AddOrImport')}
          rightText={getSettings().deviceSize === 'small' ?  <MCIcon size={25} name='import' /> : '   ADD'}
        />

        <Modal
          visible={this.state.showImportModal}
          onRequestClose={this.toggleImportModal}
          animationType='slide'
        >
          <ImportContacts screenProps={{ toggle: this.toggleImportModal }} />
        </Modal>

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
            <TouchableOpacity activeOpacity={0.4} onPress={() => this.props.navigation.navigate('UpdateContact', {contact: item})} key={item.id}>
              <View style={styles.wholeRow}>
                <View style={[styles.rowColor, {backgroundColor: convertColor(item.color)}]} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>{item.firstName} {item.lastName}</Text>
                  <Text style={styles.rowSubtitle}>{convertFrequency(item.frequency)} (Last contact {item.lastContact ? moment(item.lastContact).format('L') : 'N/A'})</Text>
                </View>
                <MIcon name="edit" style={styles.editIcon} size={25} color="#bdbdbd" />
              </View>
            </TouchableOpacity>
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
  wholeRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    height: 60,
  },
  rowColor: {
    width: 8,
    height: 46,
    backgroundColor: '#73d4e3',
    // marginLeft: 5,
    marginRight: 15,
    // borderRadius: 4
    borderTopRightRadius: 1.5,
    borderBottomRightRadius: 1.5,
  },
  rowContent: {
    flex: 1
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 19
  },
  rowSubtitle: {
    fontSize: 16,
    color: 'gray'
  },
  editIcon: {
    width: 25,
    height: 25,
    marginRight: 14,
  }
});
