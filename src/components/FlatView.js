import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';

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
    console.log("on flatView, here are the contacts", this.state.contacts, this.props.store.contacts)
    console.log("filtered contacts and query", this.state.contacts, this.state.query)
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
              placeholderTextColor="#bfbfbf"
              autoFocus={true}
              autoCorrect={false}
              onChangeText={query => this.setState({query: query})}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => this._focusNextField('2')}
          />
        </View>

        <FlatList
          style={styles.flatlist}
          keyExtractor={this._keyExtractor}
          data={this.filteredContacts()}
          renderItem={({item}) => <Text>{item.firstName} {item.lastName}</Text>}
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
    color: 'black',
    height: 50,
    backgroundColor: 'darkgrey',
  },
  flatlist: {
    backgroundColor: 'azure'
  },
});
