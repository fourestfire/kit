import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TextInput, TouchableOpacity, Dimensions, SectionList, Modal, AsyncStorage } from 'react-native';
import sampleContacts from '../utils/seed';
import Header from './Header';
import Collapsible from 'react-native-collapsible';
import Interactable from 'react-native-interactable';
import moment from 'moment';
import { convertFrequency, convertDiff } from '../utils/utils';
import Row from './SingleContactRow';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { createContact, getAllContacts, deleteAllContacts, initializeSettingsIfNeeded, getSettings, setLastLogin, setFinishedToday } from '../redux/realm';
import { convertColor } from '../utils/utils';

import Toast from 'react-native-toast-native';
import { toastStyle } from '../styles/global';
import Mixpanel from 'react-native-mixpanel';
import Intro from './Intro';

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
      showTutorialModal: false,
      completeModalContact: {},
      peopleInToday: null,
    };
  }

  componentWillMount() {
    // allows us to tell current time in moment during testing
    // console.log("mounted main")
      // let m = moment()
      // // console.log(moment().format('x'))
      // m.add(20, 'd');
      // console.log("newdate", m.format('x'))

    // see current contacts
      // console.log("here are all the current contacts");
      // getAllContacts().forEach((contact, idx) => console.log(`contact ${idx + 1}: ${contact.firstName} ${contact.lastName} ${contact.phoneNum} ${contact.nextContact} ${contact.lastContact}`));

    // initialize global settings if uninitialized
    initializeSettingsIfNeeded();

    // load contacts from realm into redux store
    let allContacts = Array.prototype.slice.call(getAllContacts());
    this.props.getAllContactsSync(allContacts);
    // console.log("allContacts", allContacts)

    // on first login of day,
    // todayPeeps === 0 && peeps > 0: give toast
    // todayPeeps > 1: nothing
    if (getSettings().lastOpenedToday === false) {
      if (this.props.store.contacts.length > 0 && this.props.store.contacts.filter(el => moment(el.nextContact).isSameOrBefore(moment(), 'day')).length === 0) {
        Toast.show("all clear for today - add more contacts to kit or check in tomorrow.", Toast.LONG, Toast.BOTTOM, toastStyle);
        setFinishedToday(true);
      } else {
        setFinishedToday(false);
      }
    }

    // show tutorial on first run
    if (!getSettings().tutorialSeen) this.toggleTutorialModal();

    console.log('settings', getSettings())
  }

  toggleTutorialModal = () => {
    this.setState({ showTutorialModal: !this.state.showTutorialModal });
  }


  toggleCompleteModal = (contact) => {
    this.setState({ showCompleteModal: !this.state.showCompleteModal, completeModalContact: contact});
  }

  render() {
    const physics = {
      damping: 1 - 0.6,
      tension: 400
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
            leftText={'SETTINGS'}
            title={'keep in touch'}
            rightOnPress={() => {  // on first run, send them to import before edit
              if (getSettings().contactsImported) this.props.navigation.navigate('AllContacts');
              else this.props.navigation.navigate('ImportContactsOptions');
            }}
            rightText={'   IMPORT'} // if device size is small, have to make the import text into an icon
          />
        </View>

        <ScrollView>
        {/* Populate Today column if person's date is same as today's or before it */}

          <View style={styles.logo}>
            <Icon size={80} name='logo-nodejs' />
          </View>

          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderText}> today </Text>
          </View>

        {
          this.props.store.contacts
          .filter(el => moment(el.nextContact).isSameOrBefore(moment(), 'day'))
          .sort((a, b) => result = a.firstName > b.firstName ? 1 : -1)
          .map(contact => {
            return (
              <Row physics={physics} contact={contact} key={contact.id}>
                <View style={styles.wholeRow}>
                  <View style={[styles.rowColor, {backgroundColor: convertColor(contact.color)}]} />

                  <View style={styles.rowContent}>
                    <Text style={styles.rowTitle}>{contact.firstName} {contact.lastName}</Text>
                    <Text style={styles.rowSubtitle}>Last talked: {contact.lastContact ? convertDiff(moment().diff(moment(contact.lastContact), 'days')) : 'N/A'}</Text>
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

        {/* Populate next three weeks contacts */}
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderText}> upcoming </Text>
          </View>

        {
          this.props.store.contacts
          .filter(el => moment(el.nextContact).isBetween(moment().add(1, 'day'), moment().add(21, 'day'), 'day', '[]'))
          .sort((a, b) => result = a.firstName > b.firstName ? 1 : -1)
          .map(contact => {
            return (
              <Row physics={physics} contact={contact} key={contact.id}>
                <View style={styles.wholeRow}>
                  <View style={[styles.rowColor, {backgroundColor: convertColor(contact.color)}]} />

                  <View style={styles.rowContent}>
                    <Text style={styles.rowTitle}>{contact.firstName} {contact.lastName}</Text>
                    <Text style={styles.rowSubtitle}>Last talked: {contact.lastContact ? convertDiff(moment().diff(moment(contact.lastContact), 'days')) : 'N/A'}</Text>
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
