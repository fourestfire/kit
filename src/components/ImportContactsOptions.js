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
import FrequencyModal from './FrequencyModal';
import Mixpanel from 'react-native-mixpanel';
import Header from './Header';
import ModalDropdown from 'react-native-modal-dropdown';
import { convertTextToFrequency, isDeviceSmall } from '../utils/utils';

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
      showFrequencyModal: false,
      frequency: 14,
      modalDropdownText: 'Bi-Weekly',
      color: 'None',
    };
  }

  componentDidMount() {
    console.log('routeState', this.props.navigation.state.params);
  }

  toggleImportModal = () => {
    Mixpanel.trackWithProperties('Headed to Import', {color: this.state.color, frequency: Number(this.state.frequency)});
    this.setState({ showImportModal: !this.state.showImportModal });
    if (this.props.navigation.state.params.parentRoute === 'Today') this.props.navigation.navigate('Today');
    else this.props.navigation.navigate('AllContacts');
  }

  toggleFrequencyModal = () => {
    this.setState({ showFrequencyModal: !this.state.showFrequencyModal });
  }

  onCustomFrequencyUpdated = (frequency) => {
    console.log('this is the selected custom freq', frequency)
    this.setState({frequency: frequency});
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
          <ImportContacts screenProps={{ toggle: this.toggleImportModal }} settings={{frequency: Number(this.state.frequency), color: this.state.color}} />
        </Modal>

        <Modal
          visible={this.state.showFrequencyModal}
          onRequestClose={this.toggleFrequencyModal}
          animationType='slide'
        >
          <FrequencyModal screenProps={{ toggle: this.toggleFrequencyModal, freqUpdated: this.onCustomFrequencyUpdated }} />
        </Modal>

        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />


        <View style={styles.helpTextView}>
          <Text style={styles.helpText}>Before you import, you can choose some options to apply to all the contacts you import. Group is an optional setting that allows you to filter your contacts. </Text>
        </View>

        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />
        <View style={styles.tenSpacer} />

        <View style={styles.segmentedWrapper}>
          <Text style={styles.formLabel}> Group </Text>
          <SegmentedControlIOS
              style={styles.segmentedControl}
              selectedIndex={3}
              values={['Purple', 'Teal', 'Green', 'None']}
              tintColor='#333'
              onValueChange={color => this.setColor(color)}
          />
        </View>

        <View style={styles.tenSpacer} />

        {/*<View style={styles.textWrapper}>
          <Text style={styles.formLabel}> Contact Frequency </Text>
          <TextInput
            ref="1"
            style={styles.textInput}
            placeholderTextColor="#bfbfbf"
            placeholder="Contact Frequency (in days)"
            keyboardType="numeric"
            defaultValue="30"
            onChangeText={frequency => this.setState({frequency})}
            returnKeyType="done"
          />
        </View> */}

        <View style={styles.textWrapper}>
          <Text style={styles.formLabel}> Contact Frequency </Text>
          <ModalDropdown
            options={['Weekly', 'Bi-Weekly', 'Every 3 weeks', 'Monthly', 'Bi-Monthly', 'Quarterly', 'Bi-Annually', 'Custom']}
            style={{marginTop: 14}}
            textStyle={{fontSize: 18, color: 'black'}}
            dropdownStyle={{marginTop: 4, backgroundColor: 'white', borderWidth: 1, borderColor: 'grey'}}
            dropdownTextStyle={{fontSize: 16, color: 'black'}}
            dropdownTextHighlightStyle={{backgroundColor: 'hsla(240, 100%, 27%, 0.35)'}}
            adjustFrame={(style) => {
              newStyle = style;
              newStyle.height = isDeviceSmall() ? style.height + 70 : style.height + 152;
              return newStyle;
            }}
            defaultIndex={3}
            defaultValue={this.state.modalDropdownText}
            onSelect={(index, value) => {
              if (value !== 'Custom') {
                // console.log('converting text to freq..', convertTextToFrequency(value))
                this.setState({frequency: convertTextToFrequency(value)})
                return convertTextToFrequency(value);
              } else {
                this.toggleFrequencyModal();
              }
            }}
          />
        </View>

        <View style={styles.tenSpacer} />
        <View style={styles.bottomSpacer} />

        <View style={styles.flexWrap}>
        <TouchableOpacity
          style={[styles.actionButton, styles.importOptions]}
          backgroundColor='black'
          onPress={this.toggleImportModal}
        >
          <Text style={styles.actionText}> Begin Import </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tenSpacer} />
      <View style={styles.tenSpacer} />
      <View style={styles.tenSpacer} />
      <View style={styles.tenSpacer} />
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

