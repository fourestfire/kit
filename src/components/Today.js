import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity, Dimensions, SectionList, Modal, AsyncStorage } from 'react-native';
import Header from './Header';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';
import Interactable from 'react-native-interactable';
import { convertFrequency } from '../utils/utils';
import Row from './SingleContactRow';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { createContact, getAllContacts, deleteAllContacts, initializeSettingsIfNeeded, getSettings } from '../redux/realm';
import sampleContacts from '../utils/seed';
import { convertColor } from '../utils/utils';

import { StackNavigator, TabNavigator } from "react-navigation";
import FlatView from './FlatView';
import AddContact from './AddContact';
import AddOrImport from './AddOrImport';
import UpdateContact from './UpdateContact';
import ImportContacts from './ImportContacts';
import ImportContactsOptions from './ImportContactsOptions';
import Complete from './Complete';

import SettingsMenu from './SettingsMenu';
import SettingsChangeMessage from './SettingsChangeMessage';
import SettingsHelp from './SettingsHelp';
import SettingsDeleteAll from './SettingsDeleteAll';
import SettingsLeaveFeedback from './SettingsLeaveFeedback';
import SettingsPushNotifications from './SettingsPushNotifications';
import OneSignal from 'react-native-onesignal'

import Intro from './Intro';

class TodayView extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Today',
      icon: ({ tintColor }) => <MIcon size={24} name='calendar-check' color={ tintColor }/>
    },
    header: {
      visible: false
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      showCompleteModal: false,
      completeModalContact: {},
      showTutorialModal: false,
    };
  }

  componentWillMount() {
    // allows us to tell current time in moment during testing
    // console.log("mounted main")
      // let m = moment()
      // // console.log(moment().format('x'))
      // m.add(20, 'd');
      // console.log("newdate", m.format('x'))

    // delete existing contacts, then grabs sample contacts from seed file and does initial load for testing
      // deleteAllContacts();
      // sampleContacts.forEach(contact => {
      //   createContact(contact)
      // });

    // see current contacts
      // console.log("here are all the current contacts");
      // getAllContacts().forEach((contact, idx) => console.log(`contact ${idx + 1}: ${contact.firstName} ${contact.lastName} ${contact.phoneNum} ${contact.nextContact} ${contact.lastContact}`));

    // load contacts from realm into redux store
    let allContacts = Array.prototype.slice.call(getAllContacts());
    this.props.getAllContactsSync(allContacts);
    // console.log("allContacts", allContacts)

    // initialize global settings if uninitialized
    initializeSettingsIfNeeded();

    // show tutorial on first run
    if (!getSettings().tutorialSeen) this.toggleTutorialModal();

    // remote push notifications
    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('registered', this.onRegistered);
    // OneSignal.addEventListener('ids', this.onIds);
  }

  // componentWillUnmount() {
  //   OneSignal.removeEventListener('received', this.onReceived);
  //   OneSignal.removeEventListener('opened', this.onOpened);
  //   OneSignal.removeEventListener('registered', this.onRegistered);
  //   OneSignal.removeEventListener('ids', this.onIds);
  // }

  // onReceived(notification) {
  //   console.log("Notification received: ", notification);
  // }

  // onOpened(openResult) {
  //   console.log('Message: ', openResult.notification.payload.body);
  //   console.log('Data: ', openResult.notification.payload.additionalData);
  //   console.log('isActive: ', openResult.notification.isAppInFocus);
  //   console.log('openResult: ', openResult);
  // }

  // onRegistered(notifData) {
  //   console.log("Device had been registered for push notifications!", notifData);
  // }

  // onIds(device) {
  //   console.log('Device info: ', device);
  // }

  // end block of OneSignal code

  toggleTutorialModal = () => {
    this.setState({ showTutorialModal: !this.state.showTutorialModal });
  }

  toggleCompleteModal = (contact) => {
    this.setState({ showCompleteModal: !this.state.showCompleteModal, completeModalContact: contact});
    // console.log("completeModalBoolStatus", this.state.showCompleteModal)
  }

  render() {
    const physics = {
      damping: 1 - 0.7,
      tension: 300
    }

    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.showTutorialModal}
          onRequestClose={this.toggleTutorial}
          animationType='slide'
        >
          <Intro screenProps={{ toggle: this.toggleTutorialModal }} />
        </Modal>

        <Modal
        visible={this.state.showCompleteModal}
        onRequestClose={this.toggleCompleteModal}
        animationType='fade'
        >
          <Complete contact={this.state.completeModalContact} screenProps={{ toggle: this.toggleCompleteModal }} />
        </Modal>

        <View>
          <Header
            leftOnPress={() => this.props.navigation.navigate('SettingsMenu')}
            leftText={getSettings().deviceSize === 'small' ?  <Icon size={25} name='ios-settings' /> : 'SETTINGS'}
            title={'keep in touch'}
            rightOnPress={() => {  // on first run, send them to import before edit
              if (getSettings().contactsImported) this.props.navigation.navigate('AllContacts');
              else this.props.navigation.navigate('ImportContactsOptions');
            }}
            rightText={getSettings().contactsImported ? '    EDIT' : getSettings().deviceSize === 'small' ?  <MIcon size={25} name='import' /> : '   IMPORT'} // if device size is small, have to make the import text into an icon
          />
        </View>

        <ScrollView>
        {/* Populate Today column if person's date is same as today's or before it */}

          <View style={styles.logo}>
            <Icon size={80} name='logo-nodejs' />
          </View>

          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderText}> Today </Text>
          </View>

        {
          this.props.store.contacts
          .filter(el => moment(el.nextContact).isSameOrBefore(moment(), 'day'))
          .sort((a, b) => result = a.firstName > b.firstName ? 1 : -1)
          .map(contact => {
            return (
              <Row physics={physics} contact={contact}>
                <View style={styles.wholeRow}>
                  <View style={[styles.rowColor, {backgroundColor: convertColor(contact.color)}]} />

                  <View style={styles.rowContent}>
                    <Text style={styles.rowTitle}>{contact.firstName} {contact.lastName}</Text>
                    <Text style={styles.rowSubtitle}>Last contact date: {contact.lastContact ? moment(contact.lastContact).format('L') : 'N/A'}</Text>
                    <Text style={styles.rowSubtitle}>Prev note: {contact.lastMsg} </Text>
                  </View>

                  <TouchableOpacity onPress={this.toggleCompleteModal.bind(this, contact)} style={[styles.doneHolder]}>
                    <FIcon name="check" style={styles.doneButton} size={25} color="lightgray" />
                  </TouchableOpacity>
                </View>
              </Row>
            );
          })
        }

        {/* Populate Rest of Week contacts */}
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderText}> Rest of Week </Text>
          </View>

        {
          this.props.store.contacts
          .filter(el => moment(el.nextContact).isBetween(moment().add(1, 'day'), moment().add(14, 'day'), 'day', '[]'))
          .sort((a, b) => result = a.firstName > b.firstName ? 1 : -1)
          .map(contact => {
            return (
              <Row physics={physics} contact={contact}>
                <View style={styles.wholeRow}>
                  <View style={[styles.rowColor, {backgroundColor: convertColor(contact.color)}]} />

                  <View style={styles.rowContent}>
                    <Text style={styles.rowTitle}>{contact.firstName} {contact.lastName}</Text>
                    <Text style={styles.rowSubtitle}>Last contact date: {contact.lastContact ? moment(contact.lastContact).format('L') : 'N/A'}</Text>
                    <Text style={styles.rowSubtitle}>Prev note: {contact.lastMsg} </Text>
                  </View>

                  <TouchableOpacity onPress={this.toggleCompleteModal.bind(this, contact)} style={[styles.doneHolder]}>
                    <FIcon name="check" style={styles.doneButton} size={25} color="lightgray" />
                  </TouchableOpacity>
                </View>
              </Row>
            );
          })
        }
      </ScrollView>
    </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { getAllContactsSync } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ getAllContactsSync });

const Today = connect(mapState, mapDispatch)(TodayView);

export default kit = StackNavigator({
    Today: {
      screen: Today,
      navigationOptions: {
        header: { visible: false },
      },
    },
    AllContacts: {
      screen: FlatView
    },
    AddContact: {
      screen: AddContact
    },
    AddOrImport: {
      screen: AddOrImport
    },
    UpdateContact: {
      screen: UpdateContact
    },
    ImportContacts: {
      screen: ImportContacts
    },
    ImportContactsOptions: {
      screen: ImportContactsOptions
    },
    SettingsMenu: {
      screen: SettingsMenu
    },
    SettingsChangeMessage: {
      screen: SettingsChangeMessage
    },
    SettingsHelp: {
      screen: SettingsHelp
    },
    SettingsDeleteAll: {
      screen: SettingsDeleteAll
    },
    SettingsLeaveFeedback: {
      screen: SettingsLeaveFeedback
    },
    SettingsPushNotifications: {
      screen: SettingsPushNotifications
    },

  }, { headerMode: 'screen' }
);

/* -------------------<   STYLES   >-------------------- */
const Screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  sectionList: {
    backgroundColor: 'white'
  },
  rowHeader: {
    flex: 1,
    backgroundColor: 'lightgrey',
    height: 50,
    justifyContent: 'center',
    borderColor: 'darkgray',
    borderBottomWidth: 1.8,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  rowHeaderText: {
    fontSize: 30,
    fontWeight: '200',
    marginLeft: 14,
  },
  wholeRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee'
  },
  rowContent: {
    flex: 1
  },
  rowColor: {
    width: 10,
    height: 70,
    backgroundColor: '#73d4e3',
    marginRight: 12,
    zIndex: -1,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 19
  },
  rowSubtitle: {
    fontSize: 16,
    color: 'gray'
  },
  logo: {
    marginTop: -350,
    width: Screen.width,
    height: 350,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center'
  },
  doneHolder: {
    top: 0,
    width: 70,
    height: 70,
    paddingRight: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  doneButton: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
