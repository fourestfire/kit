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
  TextInput,
} from 'react-native';

import Header from './Header';
import { getSettings } from '../redux/realm';
import Emoji from 'react-native-emoji';

import querystring from 'querystring';
import axios from 'axios';

/* -------------------<   COMPONENT   >-------------------- */

class SettingsLeaveFeedback extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftOnPress={() => this.props.navigation.goBack(null)}
          leftText='Back'
          title='leave feedback'
          rightOnPress={null}
          rightText='   '
        />

        <View style={styles.flex}>
          <Text style={styles.paragraph}>Hi! Thanks for helping me test this app. If you encounter any issues or just have any suggestions or comments, please submit the form below with details. It's anonymous, so if you want a response, include some sort of identifying information. </Text>
          <TextInput
              style={styles.textInput}
              autoFocus={true}
              multiline={true}
              returnKeyType="done"
              defaultValue={''}
              onChangeText={message => this.setState({message})}
          />

        <TouchableOpacity
            style={styles.submitButton}
            backgroundColor='black'
            onPress={() => {
              try {
                axios.post('https://script.google.com/macros/s/AKfycbwHVoG7eNO3V7-Pf_rkuHfNJbA6oL5AIoA9gK-StILPWI2Aa5PW/exec',
                  querystring.stringify({ Feedback: this.state.message })
                )
                .then(function (response) {
                  this.props.navigation.goBack(null);
                })
                .catch(function (error) {
                  console.log(error);
                });
              } catch (error) {
                console.warning("an error occurred", error)
              }
            }}
          >
            <Text style={styles.submitText}> Submit Feedback <Emoji name=":balloon:"/></Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(SettingsLeaveFeedback);

/* -------------------<   STYLING   >-------------------- */
import { maxHeight, maxWidth } from '../styles/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  flex: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textInput: {
    backgroundColor: 'azure',
    padding: 5,
    margin: 10,
    // width: maxWidth - 50,
    height: 100,
    fontSize: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  paragraph: {
    margin: 10,
    fontSize: 18,
    fontWeight: '300'
  },
  submitButton: {
    marginTop: 40,
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: maxWidth / 1.5,
    borderRadius: 10
  },
  submitText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '300'
  },
  spacer: {
    flex: 1,
    height: 20,
  },
});
