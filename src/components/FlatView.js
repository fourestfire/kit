import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';

import moment from 'moment';
import { convertFrequency } from '../utils/utils';

import Row from './SingleContactRow';
import Interactable from 'react-native-interactable';

class FlatView extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'FlatView',
      icon: ({ tintColor }) => <MIcon size={25} name='calendar-check' color={ tintColor }/>
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  filterContacts(contacts, query) {
    return filteredContacts = contacts.filter(contact => {
      return contact.firstName.match(new RegExp(query, 'i')) || contact.lastName.match(new RegExp(query, 'i'));
    })
  }

  filteredContacts() {
    return this.filterContacts(this.props.store.contacts, this.state.query)
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    const physics = {
      damping: 1 - 0.7,
      tension: 300
    }

    return (
      <View style={styles.container}>
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

        <View style={styles.searchbar}>
          <TextInput
            ref="1"
              style={styles.textInput}
              placeholder={'Search for a contact'}
              placeholderTextColor="white"
              autoCorrect={false}
              onChangeText={query => this.setState({query: query})}
              returnKeyType="next"
              blurOnSubmit={false}
          />
        </View>

        <FlatList
          style={styles.flatlist}
          keyExtractor={this._keyExtractor}
          data={this.filteredContacts()}
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
            </Row>
        }/>

      </View>
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';
import { } from '../redux/reducer';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(FlatView);

/* -------------------<   STYLES   >-------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  searchbar: {
    height: 50,
  },
  textInput: {
    color: 'white',
    height: 50,
    backgroundColor: 'darkgrey',
  },
  flatlist: {
    backgroundColor: 'azure'
  },
});
