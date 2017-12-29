import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Mixpanel from 'react-native-mixpanel';
import Toast from 'react-native-toast-native';
import { toastStyle } from '../styles/global';

class ImportContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 21,
    };
  }

  pickFrequency() {
    this.props.screenProps.freqUpdated(Number(this.state.days));
    this.props.screenProps.toggle();

    setTimeout(() => {
      Toast.show(`Custom frequency set: Every ${Number(this.state.days)} days`, Toast.LONG, Toast.BOTTOM, toastStyle);
    }, 1700);
  }

  render() {
    return (
        <View style={styles.container}>

          <TouchableOpacity onPress={this.props.screenProps.toggle} style={styles.closeButton}>
            <Icon name="ios-close" size={50} color="darkgrey" />
          </TouchableOpacity>

          <View style={styles.flexSpacer} />

          <View style={styles.helpTextView}>
            <Text style={styles.helpText}>Choose a custom frequency for how often you want to keep in touch with your contacts. </Text>
          </View>

          <View style={styles.tenSpacer} />
          <View style={styles.tenSpacer} />
          <View style={styles.tenSpacer} />
          <View style={styles.tenSpacer} />

          <View style={styles.textWrapper}>
            <Text style={styles.formLabel}> Contact Frequency (in days) </Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#bfbfbf"
              keyboardType="numeric"
              autoFocus={true}
              defaultValue={21} // not showing default value right now
              onChangeText={days => this.setState({days})}
              returnKeyType="done"
            />
          </View>

          <TouchableOpacity
            style={this.state.numToImport === 0 ? [styles.actionButton] : styles.actionButton }
            disabled={this.state.numToImport === 0}
            onPress={this.pickFrequency.bind(this)}
            >
              <Text style={styles.actionText}> Confirm </Text>
          </TouchableOpacity>

          <View style={styles.flexSpacer} />

        </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { addContact } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ addContact });

export default connect(mapState, mapDispatch)(ImportContacts);

/* -------------------<   STYLES   >-------------------- */
import { maxHeight, maxWidth } from '../styles/global';
import { isIphoneX } from 'react-native-iphone-x-helper';

const marginTop = isIphoneX() ? 45 : 25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: marginTop,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {
    width: maxWidth - 50,
    height: 50,
    fontSize: 18,
  },

  helpTextView: {
    height: 50,
    width: maxWidth - 50,
    margin: 10,
  },

  helpText: {
    fontSize: 18,
    color: 'black',
    // margin: -4,
    fontWeight: '300'
  },

  tenSpacer: {
    height: 10,
  },
  flexSpacer: {
    flex: 1,
  },
  textWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    // backgroundColor: 'lavender',
    // flexDirection: 'column',
    height: 50,
    width: maxWidth - 50,
    margin: 10,
    // flex: 1,
  },
  formLabel: {
    fontSize: 18,
    color: 'grey',
    margin: -6,
    fontStyle: 'italic',
  },
  actionButton: {
    backgroundColor: 'hsla(240, 100%, 27%, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: maxWidth - maxWidth / 4,
    marginLeft: maxWidth / 15,
    borderRadius: 5,
    borderColor: 'hsla(240, 100%, 27%, 0.9)', // dark blue base,
    borderLeftWidth: 1.2,
    borderRightWidth: 1.2,
    borderTopWidth: 1.2,
    position: 'absolute',
    left: 0,
    top: 11,
    zIndex: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'darkblue',
  },
  disabled: {
    backgroundColor: '#f1f1f1',
    borderColor: 'grey',
    borderBottomWidth: 3,
    borderLeftWidth: 1.2,
    borderRightWidth: 1.2,
    borderTopWidth: 1.2,
    borderBottomColor: 'grey',
  },
  actionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '300'
  },
  actionTextDisabled: {
    color: 'grey',
    fontSize: 20,
    fontWeight: '300'
  },

  topSpacer: {
    height: 55,
  },
  closeButton: {
    height: maxHeight / 14,
    width: maxHeight / 14,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 3,
    top: 5,
    zIndex: 10
  }

});
