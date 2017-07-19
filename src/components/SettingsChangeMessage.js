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
import Emoji from 'react-native-emoji';
import { getSettings, changeMessageInSettings } from '../redux/realm';

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
    changeMessageInSettings(this.state.message);
    this.props.navigation.goBack(null);
  }

  removeMessage() {
    changeMessageInSettings('');
    this.props.navigation.goBack(null);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftOnPress={() => this.props.navigation.goBack(null)}
          leftText='BACK'
          title={getSettings().deviceSize === 'small' ? 'update message' : 'update text message'}
          rightOnPress={null}
          rightText='   '
        />
        <View style={styles.flex}>
          <Text style={styles.paragraph}>On the main screen of the app, you can send pre-composed text messages. Feel free to change the default message below or remove it completely.</Text>

          <TextInput
            style={styles.textInput}
            autoFocus={true}
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
    backgroundColor: 'white',
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
