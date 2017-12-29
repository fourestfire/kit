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
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import Header from './Header';
import Emoji from 'react-native-emoji';
import { getSettings, changeMessageInSettings } from '../redux/realm';
import Mixpanel from 'react-native-mixpanel';
import Toast from 'react-native-toast-native';
import { toastStyle } from '../styles/global';

/* -------------------<   COMPONENT   >-------------------- */

class ChangeMessage extends React.Component {
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

  componentDidMount() {
    this.setState({message: getSettings().textMessage});
  }

  changeMessage() {
    Mixpanel.trackWithProperties('Text Message Updated', {type: 'changed'});
    Toast.show("message updated!", Toast.SHORT, Toast.BOTTOM, toastStyle);
    changeMessageInSettings(this.state.message);
  }

  removeMessage() {
    Mixpanel.trackWithProperties('Text Message Updated', {type: 'removed'});
    Toast.show("message removed!", Toast.SHORT, Toast.BOTTOM, toastStyle);
    changeMessageInSettings('');
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header
          leftOnPress={() => this.props.navigation.goBack(null)}
          leftText='BACK'
          title={'update text msg'}
          rightOnPress={null}
          rightText='   '
        />
        <View style={styles.flex}>
          <Text style={styles.paragraph}>On the main screen of the app, you can send pre-composed text messages. Feel free to change the default message below or remove it completely.</Text>

          <TextInput
            style={styles.textInput}
            autoFocus={false}
            multiline={true}
            returnKeyType="done"
            defaultValue={getSettings().textMessage}
            onChangeText={message => this.setState({message})}
          />

          <TouchableOpacity
            style={styles.submitButton}
            backgroundColor='black'
            onPress={this.changeMessage.bind(this)}
          >
            <Text style={styles.submitText}> Change Message <Emoji name=":cat:"/><Emoji name=":dog:"/> </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            backgroundColor='black'
            onPress={this.removeMessage.bind(this)}
          >
            <Text style={styles.submitText}> Set Message as Blank </Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(ChangeMessage);


/* -------------------<   STYLING   >-------------------- */
import { maxHeight, maxWidth } from '../styles/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textInput: {
    backgroundColor: '#f1f1f1',
    padding: 5,
    margin: 16,
    // width: maxWidth - 50,
    height: 60,
    fontSize: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  paragraph: {
    margin: 15,
    fontSize: 18,
    fontWeight: '300'
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: 'hsla(240, 100%, 27%, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: maxWidth / 1.5,
    borderRadius: 5,
    alignSelf: 'center',
    borderColor: 'hsla(240, 100%, 27%, 0.9)', // dark blue base
    borderLeftWidth: 1.2,
    borderRightWidth: 1.2,
    borderTopWidth: 1.2,
    borderBottomWidth: 4,
    borderBottomColor: 'darkblue',
  },
  submitText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '300'
  },
});
