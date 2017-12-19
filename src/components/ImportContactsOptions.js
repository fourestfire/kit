import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  SegmentedControlIOS,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal
} from 'react-native';
import ImportContacts from './ImportContacts';
import Header from './Header';

class ImportContactsOptions extends Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      showImportModal: false,
      frequency: 14,
      color: 'None',
    };
  }

  toggleImportModal = () => {
    this.setState({ showImportModal: !this.state.showImportModal });
    this.props.navigation.navigate('Today');
  }

  setColor(color) {
    if (color === 'Purple') this.setState({color: 'Group 1'});
    else if (color === 'Teal') this.setState({color: 'Group 2'});
    else if (color === 'Green') this.setState({color: 'Group 3'});
    else if (color === 'None') this.setState({color: 'None'});
  }

  render() {
    return (
      <View style={styles.container}>

        <Header
          leftOnPress={() => this.props.navigation.goBack(null)}
          leftText='BACK'
          title='import options'
        />

        <Modal
          visible={this.state.showImportModal}
          onRequestClose={this.toggleImportModal}
          animationType='slide'
        >
          <ImportContacts screenProps={{ toggle: this.toggleImportModal }} />
        </Modal>

        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />

        <View style={styles.flexWrap}>
          <TouchableOpacity
            style={[styles.actionButton, styles.long]}
            backgroundColor='black'
            onPress={this.toggleImportModal}
          >
            <Text style={styles.actionText}> Begin Import </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />

        <View style={styles.helpTextView}>
          <Text style={styles.helpText}>Before you import, you can choose some options to apply to all the contacts you import. </Text>
        </View>

        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />

        <View style={styles.segmentedWrapper}>
          <Text style={styles.formLabel}> Color / Group </Text>
          <SegmentedControlIOS
              style={styles.segmentedControl}
              selectedIndex={3}
              values={['Purple', 'Teal', 'Green', 'None']}
              tintColor='#333'
              onValueChange={color => this.setColor(color)}
          />
        </View>

        <View style={styles.tenSpacer} />

        <View style={styles.textWrapper}>
          <Text style={styles.formLabel}> Contact Frequency (in days) </Text>
          <TextInput
            ref="1"
            style={styles.textInput}
            placeholderTextColor="#bfbfbf"
            placeholder="Contact Frequency (in days)"
            keyboardType="numeric"
            defaultValue="14"
            onChangeText={frequency => this.setState({frequency})}
            returnKeyType="done"
          />
        </View>

        <View style={styles.tenSpacer} />
        <View style={styles.bottomSpacer} />
    </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { addContact } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = ({ addContact });

export default connect(mapState, mapDispatch)(ImportContactsOptions);

/* -------------------<   STYLING   >-------------------- */

import styles from '../styles/AddEditScreens';
