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

import { StackNavigator } from 'react-navigation';

import AllContacts from './AllContacts'
import MoreContacts from './MoreContacts'
import AddContact from './AddContact'
import AsyncStorage from './AsyncStorage'
import Test from './Test'

/* -------------------<   COMPONENT   >-------------------- */

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'kit: keep in touch :)',
  };

  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  componentDidMount() {
    const today = this.props.store.contacts.filter(el => el.nextContact === 'today')
    const tomorrow = this.props.store.contacts.filter(el => el.nextContact === 'tomorrow')
    // console.log('today', today, 'tomorrow', tomorrow)
    this.props.getTodaySync(today);
    this.props.getTomorrowSync(tomorrow);
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
         <View>
          <Button title="+ Add a Kit" style={styles.addButton} onPress={this.toggleModal} />
          <Modal
            visible={this.state.showModal}
            onRequestClose={this.toggleModal}
            animationType='slide'
          >
            <AddContact screenProps={{ toggle: this.toggleModal }} />
          </Modal>
        </View>

        <View style={styles.contactContainer}>
          <View style={styles.divider} />
          {
            this.props.store.contacts.map((contact, idx) => {
              return (
                <View key={idx} style={styles.contactRowContainer}>
                  <Text style={[styles.text, styles.contactKey]}> {contact.name} </Text>
                  <Text style={[styles.text, styles.contactValue]}> {contact.frequency} </Text>
                </View>
              );
            })
          }
        </View>

        <Button
          onPress={() => navigate('AllContacts')}
          title="All Contacts"
        />
        <Button
          onPress={() => navigate('MoreContacts')}
          title="More Contacts"
        />
        <Button
          onPress={() => navigate('AsyncStorage')}
          title="Async Storage Test"
        />
        <Button
          onPress={() => navigate('Test')}
          title="Other Cool Tests"
        />
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
  }
});

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { getTodaySync, getTomorrowSync } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ getTodaySync, getTomorrowSync });

const connectedHome = connect(mapState, mapDispatch)(HomeScreen);

export default kit = StackNavigator({
  Home: { screen: connectedHome },
  AddContact: { screen: AddContact },
  AsyncStorage: { screen: AsyncStorage },
  AllContacts: { screen: AllContacts },
  MoreContacts: { screen: MoreContacts },
  Test: { screen: Test },
});



