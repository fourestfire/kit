import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, SectionList, Modal, AsyncStorage } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';
import Interactable from 'react-native-interactable';
import { convertFrequency } from '../utils/utils';
import Row from './SingleContactRow';
import AddContact from './AddContact';
import Icon from 'react-native-vector-icons/Ionicons';
import { createContact, getAllContacts, deleteAllContacts, initializeSettingsIfNeeded } from '../redux/realm';
import sampleContacts from '../utils/seed';
import { convertColor } from '../utils/utils';

import { StackNavigator, TabNavigator } from "react-navigation";
import UpdateContact from './UpdateContact';
import FlatView from './FlatView';
import ImportContacts from './ImportContacts';
import SettingsMenu from './SettingsMenu';

import PushNotification from 'react-native-push-notification';

class SectionListView extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Today',
      icon: ({ tintColor }) => <MIcon size={24} name='calendar-check' color={ tintColor }/>
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      showAddModal: false,
      isTodayCollapsed: false,
      isTomorrowCollapsed: false,
      isWeekCollapsed: true,
      isLaterCollapsed: true,
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

    // load contacts into store
    let allContacts = Array.prototype.slice.call(getAllContacts());
    this.props.getAllContactsSync(allContacts);
    // console.log("allContacts", allContacts)

    // initialize global settings if uninitialized
    initializeSettingsIfNeeded();

    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
            console.log( 'TOKEN:', token );
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification );
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: { alert: true, badge: true, sound: true },

        // Should the initial notification be popped automatically; default: true
        popInitialNotification: true,
        requestPermissions: true, // if false, must call PushNotificationsHandler.requestPermissions() later
    });
  }

  renderHeader = () => {
    return <View>
      <View style={styles.logo}>
        <Icon size={80} name='logo-nodejs' />
      </View>
      <Header
        leftOnPress={() => this.props.navigation.navigate('SettingsMenu')}
        leftText='Settings'
        title='keep in touch'
        rightOnPress={() => this.props.navigation.navigate('AllContacts')}
        rightText='    Edit'
      />
    </View>
  };

  toggleAddModal = () => {
    this.setState({ showAddModal: !this.state.showAddModal })
  }

  checkIfCollapsed(type) {
    let stateToChange = `is${type}Collapsed`;
    if (type === 'Today') { currentState = this.state.isTodayCollapsed }
    else if (type === 'Tomorrow') { currentState = this.state.isTomorrowCollapsed }
    else if (type === 'Week') { currentState = this.state.isWeekCollapsed }
    else if (type === 'Later') { currentState = this.state.isLaterCollapsed }
    return currentState;
  }

  toggleCollapse(type) {
    let stateToChange = `is${type}Collapsed`;
    let currentState = this.checkIfCollapsed(type);
    console.log('currentstate', stateToChange, currentState)
    this.setState({ [stateToChange]: !currentState });
  }

  render() {
    const physics = {
      damping: 1 - 0.7,
      tension: 300
    }

    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.showAddModal}
          onRequestClose={this.toggleAddModal}
          animationType='slide'
        >
          <AddContact screenProps={{ toggle: this.toggleAddModal }} />
        </Modal>

        <SectionList
          style={styles.sectionList}
          ListHeaderComponent={this.renderHeader}
          renderSectionHeader={({section}) =>
            <TouchableOpacity activeOpacity={0.8} onPress={this.toggleCollapse.bind(this, section.title)} >
              <View style={styles.rowHeader}>
                <Text style={styles.rowHeaderText}> {this.checkIfCollapsed(section.title) ? <Icon size={30} name='ios-arrow-up' /> : <Icon size={30} name='ios-arrow-down' />}   {section.title}
                </Text>
              </View>
            </TouchableOpacity>}
          keyExtractor={item => item.id}
          sections={[
            {key: 'today', data: this.props.store.contacts.filter(el => moment(el.nextContact).isSameOrBefore(moment(), 'day')), title: 'Today'},
            {key: 'tomorrow', data: this.props.store.contacts.filter(el => moment(el.nextContact).isSame(moment().add(1, 'day'), 'day')), title: 'Tomorrow'},
            {key: 'week', data: this.props.store.contacts.filter(el => moment(el.nextContact).isBetween(moment().add(2, 'day'), moment().add(7, 'day'), 'day', '[]')), title: 'Week'},
            {key: 'later', data: this.props.store.contacts.filter(el => moment(el.nextContact).isAfter(moment().add(7, 'day'), 'day')), title: 'Later'}
          ]}
          renderItem={({item, idx, section}) =>
            <Collapsible collapsed={this.checkIfCollapsed(section)}>
              <Row physics={physics} contact={item}>
                <View style={styles.rowContent}>
                  <View style={[styles.rowIcon, {backgroundColor: convertColor(item.color)}]} />
                  <View>
                    <Text style={styles.rowTitle}>{item.firstName} {item.lastName}</Text>
                    <Text style={styles.rowSubtitle}>{convertFrequency(item.frequency)} (Last contact {item.lastContact ? moment(item.lastContact).format('L') : 'N/A'})</Text>
                    <Text style={styles.rowSubtitle}>Prev note: {item.lastMsg} </Text>
                  </View>
                </View>
              </Row>
            </Collapsible>}
          />
      </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { getAllContactsSync } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ getAllContactsSync });

const Today = connect(mapState, mapDispatch)(SectionListView);

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
    ImportContacts: {
      screen: ImportContacts
    },
    SettingsMenu: {
      screen: SettingsMenu
    }

  }, { headerMode: 'screen' }
);

// export default kit = TabNavigator({
//   Main: { screen: Main },
//   FlatView: { screen: FlatView },
//   ImportContacts: { screen: ImportContacts }
// }, {
//   // swipeEnabled: true,
//   animationEnabled: true,
//   style: {
//     backgroundColor: 'purple'
//   },
//   // tabBarPosition: 'top',
//   // lazy: true,
//   tabBarOptions: {
//     activeTintColor: 'purple',
//     style: {
//       backgroundColor: 'transparent',
//       height: 50,
//       // marginTop: 70
//     },
//     labelStyle: {
//       fontSize: 11,
//     },
//   },
// });




/* -------------------<   STYLES   >-------------------- */
const Screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  searchbar: {
    height: 50,
    backgroundColor: 'green',
    shadowColor: 'grey',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 1.0,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  textInput: {
    color: 'darkgrey',
    marginLeft: 10,
    height: 50,
    backgroundColor: 'transparent'
    // backgroundColor: 'darkgrey',
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
    borderColor: '#eeeeee'
  },
  rowIcon: {
    width: 20,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#73d4e3',
    marginLeft: 10,
    marginRight: 15,
    zIndex: -1,
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  rowSubtitle: {
    fontSize: 14,
    color: 'gray'
  },
  logo: {
    marginTop: -250,
    width: Screen.width,
    height: 250,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
