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
import MoreContacts from './MoreContacts';
import AddContact from './AddContact';
import UpdateContact from './UpdateContact';
// import AsyncStorage from './AsyncStorage';
// import Test from './Test';
import sampleContacts from '../utils/seed'
import Icon from 'react-native-vector-icons/Ionicons';
import Contacts from 'react-native-contacts';
import moment from 'moment';
import { createContact, getAllContacts } from '../redux/realm';

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

  constructor (props) {
    super(props)
    this.state = {
      showAddModal: false,
      showUpdateModal: false
    }
  }

  componentWillMount(){
    // allows us to tell current time in moment during testing
    // console.log("mounted main")
    // let m = moment()
    // // console.log(moment().format('x'))
    // m.add(20, 'd');
    // console.log("newdate", m.format('x'))

    // grabs all sample contacts and does initial load for testing
    // console.log(sampleContacts)
    // sampleContacts.forEach(contact => {
    //   createContact(contact)
    // });

    console.log("here are all the current contacts");

    getAllContacts().forEach((contact, idx) => console.log(`contact ${idx + 1}: ${contact.firstName} ${contact.lastName} ${contact.phoneNum} ${contact.nextContact} ${contact.lastContact}`));
    // loads into store
    // this.props.getAllContactsSync(sampleContacts);
  }

  toggleAddModal = () => {
    this.setState({ showAddModal: !this.state.showAddModal })
  }

  toggleUpdateModal = () => {
    this.setState({ showUpdateModal: !this.state.showUpdateModal })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
         <View>
          <Button title="+ Add a Kit" style={styles.addButton} onPress={this.toggleAddModal} />

        </View>

          <Modal
            visible={this.state.showAddModal}
            onRequestClose={this.toggleAddModal}
            animationType='slide'
          >
            <AddContact screenProps={{ toggle: this.toggleAddModal }} />
          </Modal>

         <View>
          <Button title="Update a Kit" style={styles.addButton} onPress={this.toggleUpdateModal} />
          <Modal
            visible={this.state.showUpdateModal}
            onRequestClose={this.toggleUpdateModal}
            animationType='slide'
          >
            <UpdateContact screenProps={{ toggle: this.toggleUpdateModal }} />
          </Modal>
        </View>
        <View style={styles.contactContainer}>
          <View style={styles.divider} />
          {
            this.props.store.contacts.map((contact, idx) => {
              return (
                <View key={idx} style={styles.contactRowContainer}>
                  <Text style={[styles.text, styles.contactKey]}> {contact.firstName} </Text>
                  <Text style={[styles.text, styles.contactValue]}> {contact.frequency} </Text>
                </View>
              );
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  contactContainer: {
    marginTop: 30,
    marginBottom: 30
  },

  text: {
    fontSize: 14
  },

  divider: {
    borderColor: 'lightgrey',
    borderBottomWidth: 1
  },

  contactRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgrey',
    borderBottomWidth: 1
  },

  contactKey: {
    fontWeight: 'bold',
    width: 130,
    marginLeft: 10
  },

  contactValue: {
    paddingVertical: 7,
  },

  addButton: {
    backgroundColor: 'black'
  },

  icon: {
    width: 26,
    height: 26,
  },

  // holder: {
  //   flex: 0.25,
  //   justifyContent: 'center',
  // },

});

/* -------------------<   CONTAINER   >-------------------- */

import { getAllContactsSync } from '../redux/reducer'
import { connect } from 'react-redux';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ getAllContactsSync });

const connectedHome = connect(mapState, mapDispatch)(HomeScreen);

export default kit = TabNavigator({
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
      height: 1,
      // marginTop: 70
    },
    labelStyle: {
      fontSize: 12,
    },
  },
});
