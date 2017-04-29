import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Animated, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Interactable from 'react-native-interactable';
import Row from './SingleContactRow';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './Header'

class AllContacts extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'All Contacts',
      icon: ({ tintColor }) => <Icon size={30} name='md-contacts' color={ tintColor }/>
    }
  }

  render() {
    const physics = {
      damping: 1 - 0.7,
      tension: 300
    }

    const leftItem = {
      title: "you are",
      layout: null,
      onPress: null,
      icon: null,
    }

    const rightItem = {
      title: "  cute",
      layout: null,
      onPress: null,
      icon: null,
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false} bounces={true} style={styles.container}>

       <View style={styles.logo}>
          <Text> (Hello it's me!) </Text>
        </View>

      <Header
       leftItem={leftItem}
       title="Today"
       rightItem={rightItem}
       content="testcontentnotshowing??"
       style={{backgroundColor: 'pink'}}
      />

        <View style={styles.container}>

          {
            this.props.store.contacts.map((contact) => {
              return (
                <Row key={contact.name} physics={physics} contact={contact}>
                  <View style={styles.rowContent}>
                    <View style={[styles.rowIcon, {backgroundColor: contact.color}]} />
                    <View>
                      <Text style={styles.rowTitle}>{contact.name}</Text>
                      <Text style={styles.rowSubtitle}>Frequency of contact: {contact.frequency}</Text>
                      <Text style={styles.rowSubtitle}>Last contact: {contact.lastContact}</Text>

                    </View>
                  </View>
                </Row>
              );
            })
          }

        </View>
      </ScrollView>

    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(AllContacts);

/* -------------------<   STYLES   >-------------------- */


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
    margin: -50,
    width: 'auto',
    height: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});
