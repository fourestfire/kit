import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';

class FlatView extends Component {
  // static navigationOptions = {
  //   tabBar: {
  //     label: 'FlatView',
  //     icon: ({ tintColor }) => <MIcon size={25} name='calendar-check' color={ tintColor }/>
  //   }
  // }

  render() {
    console.log("on flatView, here are the contacts", this.props.store.contacts, typeof (this.props.store.contacts))
    return (
      <View>
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

        <FlatList
          data={this.props.store.contacts}
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
});
