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
import Today from './Today'
import MoreContacts from './MoreContacts'
import AddContact from './AddContact'
import UpdateContact from './UpdateContact'
// import AsyncStorage from './AsyncStorage'
// import Test from './Test'
import Icon from 'react-native-vector-icons/Ionicons';
import Contacts from 'react-native-contacts';
import moment from 'moment';

import { getContacts } from '../redux/realm'

Contacts.getAllWithoutPhotos((err, contacts) => {
  if(err === 'denied'){
  } else {
    console.log('contacts', contacts)
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

  componentDidMount(){
    // allows us to tell current time in moment during testing
    console.log("mounted main")
    let m = moment()
    console.log(moment().format('x'))
    m.add(20, 'd');
    console.log("newdate", m.format('x'))
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

import { connect } from 'react-redux';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

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
      height: 70,
      // marginTop: 70
    },
    labelStyle: {
      fontSize: 12,
    },
  },
});
