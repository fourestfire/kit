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
    };
  }

  toggleImportModal = () => {
    this.setState({ showImportModal: !this.state.showImportModal });
    this.props.navigation.navigate('Today');
  }

  render() {
    return (
      <View style={styles.container}>

        <Modal
          visible={this.state.showImportModal}
          onRequestClose={this.toggleImportModal}
          animationType='slide'
        >
          <ImportContacts screenProps={{ toggle: this.toggleImportModal }} />
        </Modal>

        <Header
          leftOnPress={() => this.props.navigation.goBack(null)}
          leftText='BACK'
          title='choose import options'
        />

        <View style={styles.topFlex} />

        <View style={styles.flexWrap}>
          <TouchableOpacity
            style={[styles.actionButton, styles.large]}
            backgroundColor='black'
            onPress={this.toggleImportModal}
          >
            <Text style={styles.actionText}> Begin Import </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tenSpacer} />
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
