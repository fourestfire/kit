import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, SectionList, Modal} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import moment from 'moment';
import { convertFrequency } from '../utils/utils';
import Row from './SingleContactRow';
import Interactable from 'react-native-interactable';
import AddContact from './AddContact';
import Icon from 'react-native-vector-icons/Ionicons';

class SectionListView extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'SectionList',
      icon: ({ tintColor }) => <MIcon size={25} name='calendar-check' color={ tintColor }/>
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      showAddModal: false,
      isTodayCollapsed: false,
      isTomorrowCollapsed: false,
      isWeekCollapsed: true,
      isLaterCollapsed: true,
    };
  }

  toggleAddModal = () => {
    this.setState({ showAddModal: !this.state.showAddModal })
  }

  filterContacts(contacts, query, type) {
    // if section is collapsed, we want to hide results
    let hideResults = this.checkIfCollapsed(type) ? true : false;

    if (!hideResults) {
      return filteredContacts = contacts.filter(contact => {
        return contact.firstName.match(new RegExp(query, 'i')) || contact.lastName.match(new RegExp(query, 'i'));
      })
    } else {
      return [];
    }
  }

  filteredContacts(type) {
    return this.filterContacts(this.props.store.contacts, this.state.query, type);
  }

  checkIfCollapsed(type) {
    let stateToChange = `is${type}Collapsed`;
    if (type === 'Today') { currentState = this.state.isTodayCollapsed }
    else if (type === 'Tomorrow') { currentState = this.state.isTomorrowCollapsed }
    else if (type === 'Week') { currentState = this.state.isWeekCollapsed }
    else if (type === 'Later') { currentState = this.state.isLaterCollapsed }
    return currentState;
  }

  toggleCollapse(type) {
    let stateToChange = `is${type}Collapsed`;
    let currentState = this.checkIfCollapsed(type);
    console.log('currentstate', stateToChange, currentState)
    this.setState({ [stateToChange]: !currentState });
  }

  // renderHeader = () => {
  //   return <View> <Text> Header </Text> <View/>;
  // }

  render() {
    const physics = {
      damping: 1 - 0.7,
      tension: 300
    }

    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.showAddModal}
          onRequestClose={this.toggleAddModal}
          animationType='slide'
        >
          <AddContact screenProps={{ toggle: this.toggleAddModal }} />
        </Modal>

        <Header
          leftItem={{
            title: 'settings'
          }}
          title="keep in touch"
          rightItem={{
            title: '     add',
            onPress: () => this.toggleAddModal(),
          }}
          style={{backgroundColor: 'pink'}}
        />

        {/* <View style={styles.searchbar}>
          <TextInput
            style={styles.textInput}
            placeholder={'Search contacts'}
            placeholderTextColor="darkgrey"
            autoCorrect={false}
            onChangeText={query => this.setState({query: query})}
            returnKeyType="search"
            blurOnSubmit={false}
          />
        </View> */}

        <SectionList
          style={styles.sectionList}
          renderSectionHeader={({section}) =>
            <TouchableOpacity activeOpacity={0.8} onPress={this.toggleCollapse.bind(this, section.title)} >
              <View style={styles.rowHeader}>
                <Text style={styles.rowHeaderText}> {this.checkIfCollapsed(section.title) ? <Icon size={30} name='ios-arrow-up' /> : <Icon size={30} name='ios-arrow-down' />}   {section.title}
                </Text>
              </View>
            </TouchableOpacity>}
          keyExtractor={item => item.id}
          sections={[
            {key: 'today', data: this.filteredContacts('Today').filter(el => moment(el.nextContact).isSameOrBefore(moment(), 'day')), title: 'Today'},
            {key: 'tomorrow', data: this.filteredContacts('Tomorrow').filter(el => moment(el.nextContact).isSame(moment().add(1, 'day'), 'day')), title: 'Tomorrow'},
            {key: 'week', data: this.filteredContacts('Week').filter(el => moment(el.nextContact).isBetween(moment().add(2, 'day'), moment().add(7, 'day'), 'day', '[]')), title: 'Week'},
            {key: 'later', data: this.filteredContacts('Later').filter(el => moment(el.nextContact).isAfter(moment().add(7, 'day'), 'day')), title: 'Later'}
          ]}
          renderItem={({item}) =>
            <Row physics={physics} contact={item}>
              <View style={styles.rowContent}>
                <View style={[styles.rowIcon, {backgroundColor: item.color}]} />
                <View>
                  <Text style={styles.rowTitle}>{item.firstName} {item.lastName}</Text>
                  <Text style={styles.rowSubtitle}>{convertFrequency(item.frequency)} (Last contact {item.lastContact ? moment(item.lastContact).format('L') : 'N/A'})</Text>
                  <Text style={styles.rowSubtitle}>Prev note: {item.lastMsg} </Text>
                </View>
              </View>
            </Row>}
          />

      </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(SectionListView);

/* -------------------<   STYLES   >-------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  searchbar: {
    height: 50,
    backgroundColor: 'green',
    shadowColor: 'grey',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 1.0,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  textInput: {
    color: 'darkgrey',
    marginLeft: 10,
    height: 50,
    backgroundColor: 'transparent'
    // backgroundColor: 'darkgrey',
  },
  sectionList: {
    backgroundColor: 'white'
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
});
