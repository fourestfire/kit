import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Animated, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Interactable from 'react-native-interactable';
import Row from './SingleContactRow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header'
import Collapsible from 'react-native-collapsible';

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
      isCollapsed: false
    }
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
        title="Top of Mind"
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

           {/*<View style={{flex: 1, height: 50, backgroundColor: 'green'}}>
              <TouchableOpacity onPress={this.onButtonPress.bind(this)} >
                <View style={styles.button} />
              </TouchableOpacity>
            </View>*/}

          <View style={styles.heavyDivider} />
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderText}> Today </Text>
          </View>

          <Collapsible collapsed={this.state.isCollapsed}>
          {
            this.props.store.today.map((contact) => {
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
        </Collapsible>

        <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderText}> Tomorrow </Text>
          </View>

          <Collapsible collapsed={this.state.isCollapsed}>
          {
            this.props.store.tomorrow.map((contact) => {
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
        </Collapsible>

        </View>
      </ScrollView>

    );
  }

  onButtonPress() {
    this.setState({ isCollapsed: !this.state.isCollapsed });
    console.log(this.state.isCollapsed)
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

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
