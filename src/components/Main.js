import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Modal
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import FlexboxBasics from './FlexboxBasics'
import FlexboxStyling from './FlexboxStyling'
import AddContact from './AddContact'
import AsyncStorage from './AsyncStorage'

// need to use... listview? need to use a view that allows for groupings (can close group)

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

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        {/*<Button
          onPress={() => navigate('AddContact')}
          title="+ Add a Kit"
        />*/}
         <View>
          <Button title="+ Add a Kit" onPress={this.toggleModal} />
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
          onPress={() => navigate('FlexboxBasics')}
          title="Test"
        />
        <Button
          onPress={() => navigate('FlexboxStyling')}
          title="Settings"
        />
        <Button
          onPress={() => navigate('AsyncStorage')}
          title="Async Storage Test"
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
  }
});

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
// import { populateContactsSync } from '../redux/index';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

const connectedHome = connect(mapState, mapDispatch)(HomeScreen);

export default kit = StackNavigator({
  Home: { screen: connectedHome },
  AddContact: { screen: AddContact },
  AsyncStorage: { screen: AsyncStorage },
  FlexboxBasics: { screen: FlexboxBasics },
  FlexboxStyling: { screen: FlexboxStyling },
});



