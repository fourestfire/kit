import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Animated, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native';
import Interactable from 'react-native-interactable';
import Row from './SingleContactRow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Collapsible from 'react-native-collapsible';
import { BlurView } from 'react-native-blur';
import moment from 'moment';

class Today extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Today',
      icon: ({ tintColor }) => <Icon size={25} name='calendar-check' color={ tintColor }/>
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isTodayCollapsed: false,
      isTomorrowCollapsed: false,
      viewRef: null,
    }
  }

  toggleUpdateModal = () => {
    this.setState({ showUpdateModal: !this.state.showUpdateModal })
  }

  toggleTodayCollapse() {
    this.setState({ isTodayCollapsed: !this.state.isTodayCollapsed });
  }

  toggleTomorrowCollapse() {
    this.setState({ isTomorrowCollapsed: !this.state.isTomorrowCollapsed });
  }

  render() {
    const physics = {
      damping: 1 - 0.7,
      tension: 300
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false} bounces={true} style={styles.container}>

      <View style={styles.logo}>
       <Text> (Hello it's me!) </Text>
      </View>

      <Header
        leftItem={{
          title: null,
          layout: null,
          onPress: null,
          icon: null,
        }}
        title="In the Moment"
        rightItem={{
          title: null,
          layout: null,
          onPress: null,
          icon: null,
        }}
        content="testcontentnotshowing??"
        style={{backgroundColor: 'pink'}}
      />

        <View style={styles.container}>

          <View style={styles.heavyDivider} />

          {/* Populate Today column if person's date is same as today's or before it */}
          <TouchableOpacity onPress={this.toggleTodayCollapse.bind(this)} >
            <View style={styles.rowHeader}>
              <Text style={styles.rowHeaderText}> Today </Text>
            </View>
          </TouchableOpacity>

          <Collapsible collapsed={this.state.isTodayCollapsed}>
          {
            this.props.store.contacts
              .filter(el => moment(el.nextContact).isSameOrBefore(moment(), 'day'))
              .map((contact) => {
                return (
                  <Row key={contact.firstName} physics={physics} contact={contact}>
                    <View style={styles.rowContent}>
                      <View style={[styles.rowIcon, {backgroundColor: contact.color}]} />
                      <View>
                        <Text style={styles.rowTitle}>{contact.firstName} {contact.lastName}</Text>
                        <Text style={styles.rowSubtitle}>{contact.frequency} (Last contact {moment(contact.lastContact).format('L')})</Text>
                        <Text style={styles.rowSubtitle}>Prev note: {contact.lastMsg} </Text>

                      </View>
                    </View>
                  </Row>
                );
            })
          }
        </Collapsible>

        {/* Populate Tomorrow column */}
        <TouchableOpacity onPress={this.toggleTomorrowCollapse.bind(this)} >
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderText}> Tomorrow </Text>
          </View>
        </TouchableOpacity>

        <Collapsible collapsed={this.state.isTomorrowCollapsed}>
        {
          this.props.store.contacts
            .filter(el => moment(el.nextContact).subtract(1, 'day').isSame(moment(), 'day'))
            .map((contact) => {
              return (
                <Row key={contact.firstName} physics={physics} contact={contact}>
                  <View style={styles.rowContent}>
                    <View style={[styles.rowIcon, {backgroundColor: contact.color}]} />
                    <View>
                      <Text style={styles.rowTitle}>{contact.firstName} {contact.lastName}</Text>
                      <Text style={styles.rowSubtitle}>{contact.frequency} (Last contact {moment(contact.lastContact).format('L')})</Text>
                      <Text style={styles.rowSubtitle}>Prev note: {contact.lastMsg} </Text>

                    </View>
                  </View>
                </Row>
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
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  },
  rowHeader: {
    flex: 1,
    backgroundColor: 'lightgrey',
    height: 50,
    justifyContent: 'center'
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
