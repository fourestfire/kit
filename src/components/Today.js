import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Animated, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native';
import Interactable from 'react-native-interactable';
import Row from './SingleContactRow';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './Header';
import Collapsible from 'react-native-collapsible';
import { BlurView } from 'react-native-blur';
import moment from 'moment';
import AddContact from './AddContact';
import UpdateContact from './UpdateContact';
import { getAllContacts } from '../redux/realm';
import { convertFrequency } from '../utils/utils';

class Today extends Component {
  static navigationOptions = {
    tabBar: {
      label: '(Old) Today',
      icon: ({ tintColor }) => <MIcon size={25} name='calendar-check' color={ tintColor }/>
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isTodayCollapsed: false,
      isTomorrowCollapsed: false,
      isWeekCollapsed: true,
      isLaterCollapsed: true,
      viewRef: null,
      showAddModal: false,
      showUpdateModal: false,
      updateModalContact: {}
    }
  }

  toggleAddModal = () => {
    this.setState({ showAddModal: !this.state.showAddModal })
  }

  toggleUpdateModal = (contact) => {
    this.setState({ showUpdateModal: !this.state.showUpdateModal, updateModalContact: contact})
  }

  toggleCollapse(type) {
    let stateToChange = `is${type}Collapsed`
    if (type === 'Today') { currentState = this.state.isTodayCollapsed }
    else if (type === 'Tomorrow') { currentState = this.state.isTomorrowCollapsed }
    else if (type === 'Week') { currentState = this.state.isWeekCollapsed }
    else if (type === 'Later') { currentState = this.state.isLaterCollapsed }
    this.setState({ [stateToChange]: !currentState });
  }

  render() {
    const physics = {
      damping: 1 - 0.7,
      tension: 300
    }

    // console.log("rerendering, here are the contacts", this.props.store.contacts)

    return (
      <ScrollView showsVerticalScrollIndicator={false} bounces={true} style={styles.container}>

      <View style={styles.logo}>
        <Icon size={80} name='logo-nodejs' />
      </View>

      <Header
        leftItem={{
          title: 'settings',
          layout: null,
          onPress: null,
          icon: null
        }}
        title="keep in touch"
        rightItem={{
          title: '     add',
          layout: null,
          onPress: () => this.toggleAddModal(),
          icon: null,
        }}
        content="testcontentnotshowing??"
        style={{backgroundColor: 'pink'}}
      />

        <View style={styles.container}>

          <Modal
            visible={this.state.showAddModal}
            onRequestClose={this.toggleAddModal}
            animationType='slide'
          >
            <AddContact screenProps={{ toggle: this.toggleAddModal }} />
          </Modal>

          <Modal
            visible={this.state.showUpdateModal}
            onRequestClose={this.toggleUpdateModal}
            animationType='slide'
          >
            <UpdateContact screenProps={{ toggle: this.toggleUpdateModal }} contact={this.state.updateModalContact} />
          </Modal>

          <View style={styles.heavyDivider} />

          {/* Populate Today column if person's date is same as today's or before it */}
          <TouchableOpacity activeOpacity={0.8} onPress={this.toggleCollapse.bind(this, 'Today')} >
            <View style={styles.rowHeader}>
              <Text style={styles.rowHeaderText}> {this.state.isTodayCollapsed ? <Icon size={30} name='ios-arrow-up' /> : <Icon size={30} name='ios-arrow-down' />}   Today
              </Text>
            </View>
          </TouchableOpacity>

            <Collapsible collapsed={this.state.isTodayCollapsed}>
            {
              this.props.store.contacts
              .filter(el => moment(el.nextContact).isSameOrBefore(moment(), 'day'))
              .map((contact) => {
                  return (
                    <TouchableOpacity activeOpacity={0.9} onPress={this.toggleUpdateModal.bind(this, contact)} key={contact.id}>
                      <Row physics={physics} contact={contact}>
                        <View style={styles.rowContent}>
                          <View style={[styles.rowIcon, {backgroundColor: contact.color}]} />
                          <View>
                            <Text style={styles.rowTitle}>{contact.firstName} {contact.lastName}</Text>
                            <Text style={styles.rowSubtitle}>{convertFrequency(contact.frequency)} (Last contact {contact.lastContact ? moment(contact.lastContact).format('L') : 'N/A'})</Text>
                            <Text style={styles.rowSubtitle}>Prev note: {contact.lastMsg} </Text>

                          </View>
                        </View>
                      </Row>
                    </TouchableOpacity>
                  );
                })
              }
            </Collapsible>


        {/* Populate Tomorrow column if person's date is the same date as tomorrow */}
        <TouchableOpacity activeOpacity={0.8} onPress={this.toggleCollapse.bind(this, 'Tomorrow')} >
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderText}> {this.state.isTomorrowCollapsed ? <Icon size={30} name='ios-arrow-up' /> : <Icon size={30} name='ios-arrow-down' />}   Tomorrow
            </Text>
          </View>
        </TouchableOpacity>

        <Collapsible collapsed={this.state.isTomorrowCollapsed}>
        {
          this.props.store.contacts
          .filter(el => moment(el.nextContact).isSame(moment().add(1, 'day'), 'day'))
          .map((contact) => {
              return (
                <TouchableOpacity activeOpacity={0.9} onPress={this.toggleUpdateModal.bind(this, contact)} key={contact.id} >
                  <Row physics={physics} contact={contact}>
                    <View style={styles.rowContent}>
                      <View style={[styles.rowIcon, {backgroundColor: contact.color}]} />
                      <View>
                        <Text style={styles.rowTitle}>{contact.firstName} {contact.lastName}</Text>
                        <Text style={styles.rowSubtitle}>{convertFrequency(contact.frequency)} (Last contact {contact.lastContact ? moment(contact.lastContact).format('L') : 'N/A'})</Text>
                        <Text style={styles.rowSubtitle}>Prev note: {contact.lastMsg} </Text>
                      </View>
                    </View>
                  </Row>
                </TouchableOpacity>
              );
          })
        }
      </Collapsible>

       {/* Populate This Week column */}
        <TouchableOpacity activeOpacity={0.8} onPress={this.toggleCollapse.bind(this, 'Week')} >
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderText}> {this.state.isWeekCollapsed ? <Icon size={30} name='ios-arrow-up' /> : <Icon size={30} name='ios-arrow-down' />}   Rest of Week
            </Text>
          </View>
        </TouchableOpacity>

        <Collapsible collapsed={this.state.isWeekCollapsed}>
        {
          this.props.store.contacts
          .filter(el => moment(el.nextContact).isBetween(moment().add(2, 'day'), moment().add(7, 'day'), 'day', '[]')) // [] symbol sets inclusivity to include both the 2nd and the 7th days
          .map((contact) => {
              return (
                <TouchableOpacity activeOpacity={0.9} onPress={this.toggleUpdateModal.bind(this, contact)} key={contact.id} >
                  <Row physics={physics} contact={contact}>
                    <View style={styles.rowContent}>
                      <View style={[styles.rowIcon, {backgroundColor: contact.color}]} />
                      <View>
                        <Text style={styles.rowTitle}>{contact.firstName} {contact.lastName}</Text>
                        <Text style={styles.rowSubtitle}>{convertFrequency(contact.frequency)} (Last contact {contact.lastContact ? moment(contact.lastContact).format('L') : 'N/A'})</Text>
                        <Text style={styles.rowSubtitle}>Prev note: {contact.lastMsg} </Text>
                      </View>
                    </View>
                  </Row>
                </TouchableOpacity>
              );
          })
        }
      </Collapsible>

      {/* Populate Later column */}
        <TouchableOpacity activeOpacity={0.8} onPress={this.toggleCollapse.bind(this, 'Later')} >
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderText}> {this.state.isLaterCollapsed ? <Icon size={30} name='ios-arrow-up' /> : <Icon size={30} name='ios-arrow-down' />}   Later
            </Text>
          </View>
        </TouchableOpacity>

        <Collapsible collapsed={this.state.isLaterCollapsed}>
        {
          this.props.store.contacts
          .filter(el => moment(el.nextContact).isAfter(moment().add(7, 'day'), 'day'))
          .map((contact) => {
              return (
                <TouchableOpacity activeOpacity={0.9} onPress={this.toggleUpdateModal.bind(this, contact)} key={contact.id}>
                  <Row physics={physics} contact={contact}>
                    <View style={styles.rowContent}>
                      <View style={[styles.rowIcon, {backgroundColor: contact.color}]} />
                      <View>
                        <Text style={styles.rowTitle}>{contact.firstName} {contact.lastName}</Text>
                        <Text style={styles.rowSubtitle}>{convertFrequency(contact.frequency)} (Last contact {contact.lastContact ? moment(contact.lastContact).format('L') : 'N/A'})</Text>
                        <Text style={styles.rowSubtitle}>Prev note: {contact.lastMsg} </Text>
                      </View>
                    </View>
                  </Row>
                </TouchableOpacity>
              );
          })
        }
      </Collapsible>

        </View>
      </ScrollView>

    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Today);

/* -------------------<   STYLES   >-------------------- */
const Screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  heavyDivider: {
    // borderBottomWidth: 2,
    // borderColor: 'black'
  },
  absolute: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0, right: 0,
  },
  rowHeader: {
    flex: 1,
    backgroundColor: 'lightgrey',
    height: 50,
    justifyContent: 'center',
    borderColor: 'darkgray',
    borderBottomWidth: 1,
  },
  rowHeaderText: {
    fontSize: 30,
    fontWeight: '200',
    marginLeft: 10,
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
  logo: {
    marginTop: -250,
    width: Screen.width,
    height: 250,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    height: 50,
    width: 100,
    backgroundColor: 'orange'
  }
});
