import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';

// import { StackNavigator } from 'react-navigation';
import { TabNavigator } from "react-navigation";
import Today from './Today';
import FlatView from './FlatView';
import SectionList from './SectionList';
import MoreContacts from './MoreContacts';
import AddContact from './AddContact';
import UpdateContact from './UpdateContact';
// import AsyncStorage from './AsyncStorage';
// import Test from './Test';
import sampleContacts from '../utils/seed'
import Icon from 'react-native-vector-icons/Ionicons';
import Contacts from 'react-native-contacts';
import moment from 'moment';
import { createContact, getAllContacts, deleteAllContacts } from '../redux/realm';

Contacts.getAllWithoutPhotos((err, contacts) => {
  if(err === 'denied'){
  } else {
    console.log('contacts from react-native-contacts', contacts)
  }
})

/* -------------------<   COMPONENT   >-------------------- */

class HomeScreen extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Home',
      icon: ({ tintColor }) => <Icon size={25} name='md-contacts' color={ tintColor }/>
    }
  };

  componentWillMount(){
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

    // loads into store
    let allContacts = Array.prototype.slice.call(getAllContacts());
    this.props.getAllContactsSync(allContacts);
    console.log("allContacts", allContacts)
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text> Just a page to load some stuff! </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 26,
    height: 26,
  },
});

/* -------------------<   CONTAINER   >-------------------- */

import { getAllContactsSync } from '../redux/reducer'
import { connect } from 'react-redux';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ getAllContactsSync });

const connectedHome = connect(mapState, mapDispatch)(HomeScreen);

export default kit = TabNavigator({
  SectionList: { screen: SectionList },
  FlatView: { screen: FlatView },
  Today: { screen: Today },
  Home: { screen: connectedHome },
  // Test: { screen: Test },
  MoreContacts: { screen: MoreContacts },
  // AsyncStorage: { screen: AsyncStorage },
}, {
  // swipeEnabled: true,
  animationEnabled: true,
  style: {
    backgroundColor: 'purple'
  },
  // tabBarPosition: 'top',
  // lazy: true,
  tabBarOptions: {
    activeTintColor: 'purple',
    style: {
      backgroundColor: 'aliceblue',
      height: 70,
      // marginTop: 70
    },
    labelStyle: {
      fontSize: 12,
    },
  },
});
