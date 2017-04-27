import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Animated, TouchableOpacity, Dimensions, Slider, ScrollView } from 'react-native';
import Interactable from 'react-native-interactable';
import Box from './Box';

const Screen = Dimensions.get('window');

class List extends Component {

  render() {
    const damping = 1 - 0.7;
    const tension = 300;
    return (

      <ScrollView showsVerticalScrollIndicator={false} bounces={true} style={styles.container}>

        <View style={styles.logo}>
          <Text> (Hello it's me!) </Text>
        </View>

        <View style={styles.container}>

          {
            this.props.store.contacts.map((contact) => {
              return (
                <Row key={contact.name} damping={damping} tension={tension} contact={contact}>
                  <View style={styles.rowContent}>
                    <View style={styles.rowIcon} />
                    <View>
                      <Text style={styles.rowTitle}>{contact.name}</Text>
                      <Text style={styles.rowSubtitle}>Frequency of contact: {contact.frequency}</Text>

                    </View>
                  </View>
                </Row>
              );
            })
          }

        </View>
      </ScrollView>

    );
  }
}

class RowComponent extends Component {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
  }
  render() {
    {console.log(this.props)}
    return (
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
            <TouchableOpacity onPress={this.removeContact.bind(this, 'remove')} style={styles.button}>
              <View style={styles.button} />
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
            <TouchableOpacity onPress={this.onButtonPress.bind(this, 'snooze')} style={styles.button}>
              <View style={styles.button} />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={{position: 'absolute', left: 0, right: 0, height: 75}} pointerEvents='box-none'>

          <Animated.View style={
            [styles.doneHolder, {
              transform: [{
                translateX: this._deltaX.interpolate({
                  inputRange: [0, 78],
                  outputRange: [-78, 0]
                })
              }]
            }
            ]}>
            <TouchableOpacity onPress={this.onButtonPress.bind(this, 'done')} style={styles.button}>
              <View style={styles.button} />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Interactable.View
          horizontalOnly={true}
          snapPoints={[
            {x: 78, damping: 1-this.props.damping, tension: this.props.tension},
            {x: 0, damping: 1-this.props.damping, tension: this.props.tension},
            {x: -155, damping: 1-this.props.damping, tension: this.props.tension}
          ]}
          animatedValueX={this._deltaX}>
          <View style={{left: 0, right: 0, height: 75, backgroundColor: 'white'}}>
            {this.props.children}
          </View>
        </Interactable.View>

      </View>
    );
  }
  onButtonPress(name) {
    alert(`Button ${name} pressed`);
  }
  removeContact() {
    this.props.removeContactSync(this.props.contact)
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(List);

/* -------------------<   CONTAINER   >-------------------- */

import { addContactSync, removeContactSync } from '../redux/reducer';

const mapStateRow = ({ store }) => ({ store });
const mapDispatchRow = ({ addContactSync, removeContactSync });

const Row = connect(mapStateRow, mapDispatchRow)(RowComponent);

/* -------------------<   STYLES   >-------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee'
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#73d4e3',
    margin: 15
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  rowSubtitle: {
    fontSize: 14,
    color: 'gray'
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: 'salmon',
  },
  logo: {
    margin: -50,
    width: 'auto',
    height: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
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
  doneHolder: {
    position: 'absolute',
    top: 0,
    right: Screen.width - 78,
    width: Screen.width,
    height: 75,
    paddingRight: 18,
    backgroundColor: '#2f9a5d',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  playground: {
    marginTop: Screen.height <= 500 ? 0 : 80,
    padding: 20,
    width: Screen.width - 40,
    backgroundColor: '#5894f3',
    alignItems: 'stretch',
    alignSelf: 'center'
  },
  playgroundLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15
  },
  slider: {
    height: 40
  }
});
