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

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftOnPress={() => this.props.navigation.goBack(null)}
          leftText='Back'
          title='update text message'
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
  },
  paragraph: {
    margin: 10,
    fontSize: 15
  },
  textInput: {
    backgroundColor: 'azure',
    padding: 5,
    margin: 10,
    // width: maxWidth - 50,
    height: 60,
    fontSize: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
});