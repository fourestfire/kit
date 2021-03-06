import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Animated, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native';
import Interactable from 'react-native-interactable';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getSettings } from '../redux/realm';

const Screen = Dimensions.get('window');

class SingleContactRow extends Component {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
  }

  onButtonPress(name) {
    alert(`Button ${name} pressed`);
  }

  removeContact() {
    this.props.removeContactSync(this.props.contact);
  }

  render() {
    return (
      <View>

      <View style={{backgroundColor: '#ceced2'}}>
        <View style={{position: 'absolute', left: 0, right: 0, height: 75}} pointerEvents='box-none'>
          <Animated.View style={
            [styles.removeHolder, {
              transform: [{
                translateX: this._deltaX.interpolate({
                  inputRange: [-155, 0],
                  outputRange: [0, 155]
                })
              }]
            }
          ]}>
            {/*<TouchableOpacity onPress={this.removeContact.bind(this, 'remove')} style={styles.button}>*/}
            <TouchableOpacity onPress={() => Communications.phonecall(this.props.contact.phoneNum, true)} style={styles.button}>
              <Icon name="phone" size={35} color="white" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={
            [styles.snoozeHolder, {
              transform: [{
                translateX: this._deltaX.interpolate({
                  inputRange: [-155, 0],
                  outputRange: [0, 78]
                })
              }]
            }
            ]}>
            <TouchableOpacity style={styles.button} onPress={() => Communications.textWithoutEncoding(this.props.contact.phoneNum, getSettings().textMessage)}>
              <MIcon name="message-text" size={35} color="white" />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Interactable.View
          horizontalOnly={true}
          snapPoints={[
            {x: 0, damping: 1-this.props.physics.damping, tension: this.props.physics.tension},
            {x: -155, damping: 1-this.props.physics.damping, tension: this.props.physics.tension}
          ]}
          boundaries={{right: 0, bounce: 0.2}} // helps limit direction of sliding
          animatedValueX={this._deltaX}>
          <View style={{left: 0, right: 0, height: 75, backgroundColor: 'white'}}>
            {this.props.children}
          </View>
        </Interactable.View>

       </View>
      </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { addContactSync, removeContactSync } from '../redux/reducer';

import { connect } from 'react-redux';

const mapStateRow = ({ store }) => ({ store });
const mapDispatchRow = ({ addContactSync, removeContactSync });

export default connect(mapStateRow, mapDispatchRow)(SingleContactRow);

/* -------------------<   STYLES   >-------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'salmon',
  },
  removeHolder: {
    position: 'absolute',
    top: 0,
    left: Screen.width - 155,
    width: Screen.width,
    height: 75,
    paddingLeft: 18,
    backgroundColor: '#f8a024',
    justifyContent: 'center'
  },
  snoozeHolder: {
    position: 'absolute',
    top: 0,
    left: Screen.width - 78,
    width: Screen.width,
    height: 75,
    paddingLeft: 18,
    backgroundColor: '#4f7db0',
    justifyContent: 'center'
  },
});
