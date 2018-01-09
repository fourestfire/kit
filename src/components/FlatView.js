import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Header from './Header';
import moment from 'moment';
import { convertFrequencyToText, convertColor, convertDiff } from '../utils/utils';
import AddContact from './AddContact';
import UpdateContact from './UpdateContact';
import ImportContacts from './ImportContacts';

import Row from './SingleContactRow';
import Interactable from 'react-native-interactable';

import { NavigationActions, StackNavigator, TabNavigator } from 'react-navigation';
import { getSettings } from '../redux/realm';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import AddOrImport from './AddOrImport';
import FrequencyModal from './FrequencyModal';
import ImportContactsOptions from './ImportContactsOptions';
import Complete from './Complete';
import SettingsMenu from './SettingsMenu';
import SettingsChangeMessage from './SettingsChangeMessage';
import SettingsHelp from './SettingsHelp';
import SettingsDeleteAll from './SettingsDeleteAll';
import SettingsLeaveFeedback from './SettingsLeaveFeedback';
import SettingsPushNotifications from './SettingsPushNotifications';

class FlatView extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Edit Contacts',
      icon: ({ tintColor }) => <Icon size={28} name='md-contacts' color={ tintColor }/>
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
      }).sort((a, b) => result = a.fullName > b.fullName ? 1 : -1)
    } catch(e) {
      console.log("received error", e);
      return [];
    }
  }

  filteredContacts() {
    return this.filterContacts(this.props.store.contacts, this.state.query);
  }

  render() {
    return (
      <View style={styles.container}>
          <Header
          leftOnPress={() => this.props.navigation.navigate('SettingsMenu')}
          leftText={getSettings().deviceSize === 'small' ?  <Icon size={25} name='ios-settings' /> : 'SETTINGS'}
          title={'edit contacts'}
          rightOnPress={() => {  // on first run, send them to import before edit
            if (getSettings().contactsImported) this.props.navigation.navigate('AddOrImport');
            else this.props.navigation.navigate('ImportContactsOptions');
          }}
          rightText={getSettings().contactsImported ? '    ADD' : getSettings().deviceSize === 'small' ?  <MIcon size={25} name='import' /> : '   IMPORT'} // if device size is small, have to make the import text into an icon
        />

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
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
            <TouchableOpacity activeOpacity={0.4} onPress={() => this.props.navigation.navigate('UpdateContact', {contact: item})} key={item.id}>
              <View style={styles.wholeRow}>
                <View style={[styles.rowColor, {backgroundColor: convertColor(item.color)}]} />
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>{item.fullName}</Text>
                  <Text style={styles.rowSubtitle}>{convertFrequencyToText(item.frequency)} (Last: {item.lastContact ? convertDiff(moment().diff(moment(item.lastContact), 'days')) : 'N/A'})</Text>
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

const FlatViewC = connect(mapState, mapDispatch)(FlatView);

export default kit = StackNavigator({
  AllContacts: {
    screen: FlatViewC,
    navigationOptions: {
      header: { visible: false },
    },
  },
  AddContact: {
    screen: AddContact
  },
  AddOrImport: {
    screen: AddOrImport,
    navigationOptions: {
      tabBar: { visible: false },
    },
  },
  UpdateContact: {
    screen: UpdateContact,
    navigationOptions: {
      tabBar: { visible: false },
    },
  },
  ImportContacts: {
    screen: ImportContacts,
    navigationOptions: {
      tabBar: { visible: false },
    },
  },
  ImportContactsOptions: {
    screen: ImportContactsOptions,
    navigationOptions: {
      tabBar: { visible: false },
    },
  },
  FrequencyModal: {
    screen: FrequencyModal
  },
  SettingsMenu: {
    screen: SettingsMenu,
    navigationOptions: {
      tabBar: { visible: false },
    },
  },
  SettingsChangeMessage: {
    screen: SettingsChangeMessage,
    navigationOptions: {
      tabBar: { visible: false },
    },
  },
  SettingsHelp: {
    screen: SettingsHelp,
    navigationOptions: {
      tabBar: { visible: false },
    },
  },
  SettingsDeleteAll: {
    screen: SettingsDeleteAll,
    navigationOptions: {
      tabBar: { visible: false },
    },
  },
  SettingsLeaveFeedback: {
    screen: SettingsLeaveFeedback,
    navigationOptions: {
      tabBar: { visible: false },
    },
  },
  SettingsPushNotifications: {
    screen: SettingsPushNotifications,
    navigationOptions: {
      tabBar: { visible: false },
    },
  },

}, { headerMode: 'screen' }
);

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
    marginLeft: 15,
    height: 45,
    backgroundColor: 'transparent',
    fontSize: 18,
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
    height: 56,
    backgroundColor: '#73d4e3',
    // marginLeft: 5,
    marginRight: 10,
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
