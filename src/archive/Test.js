import React from 'react'
import { View, Text, ListView, Alert, StyleSheet, TouchableHighlight } from 'react-native'
import Header from './Header'

/* -------------------<   COMPONENT   >-------------------- */

class ListviewExample extends React.Component {
  constructor (props) {
    super(props)
    // Teach datasource how to detect if rows are different
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(props.results)
    }
  }

  componentWillMount() {
    this._pressData = {};
  }

  componentDidMount() {
    // const today = this.props.store.contacts.filter(el => el.nextContact === 'today')
    // const tomorrow = this.props.store.contacts.filter(el => el.nextContact === 'tomorrow')
    // // console.log('today', today, 'tomorrow', tomorrow)
    // this.props.getTodaySync(today);
    // this.props.getTomorrowSync(tomorrow);
  }

  /* ***********************************************************
  * `renderRow` function -How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={rowData.title} description={rowData.description} />
  *************************************************************/
  renderRow (searchTerm) {
    return (

      <TouchableHighlight onPress={() => {
          this._pressRow(rowID);
          highlightRow(sectionID, rowID);
        }}>
        <View>
          <View style={styles.row}>
             <Text style={styles.text}>
              hellotest!
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  /* ***********************************************************
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
  *************************************************************/
  componentWillReceiveProps (newProps) {
    if (newProps.results) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.results)
      })
    }
  }

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  render () {
    return (
      <View style={styles.container}>
        <Header
          leftItem={{
            title: null,
            layout: null,
            onPress: null,
            icon: null,
          }}
          title="Today"
          rightItem={{
            title: null,
            layout: null,
            onPress: null,
            icon: null,
          }}
          content="testcontentnotshowing??"
          style={{backgroundColor: 'pink'}}
       />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          pageSize={15}
          enableEmptySections
        />
      </View>
    )
  }

  _genRows(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (pressed)' : '';
      dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
  }

  _pressRow(rowID: number) {
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )});
  }

  _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    )
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux'
import { getTodaySync, getTomorrowSync } from '../redux/reducer';

const mapState = (state) => {
  return {
    searchTerm: state.store.searchTerm,
    results: state.store.results
  }
}

const mapDispatch = ({ getTodaySync, getTomorrowSync });

export default connect(mapState)(ListviewExample)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    flex: 1,
    backgroundColor: 'lightgrey',
    marginVertical: 5,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'black',
    textAlign: 'center',
    marginVertical: 5
  },
  label: {
    textAlign: 'center',
    color: 'blue',
    marginBottom: 5
  },
  listContent: {
    marginTop: 10
  }
})


// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   View,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Octicons';
// import Header from './Header'

// export default class Box extends Component {
//   static navigationOptions = {
//     tabBar:{
//       label: 'Settings',
//       icon: ({ tintColor }) => <Icon size={ 25 } name={ 'settings' } color={ tintColor }/>
//     }
//   }

//   render() {
//     return (
//       <View>
//         <Header
//           leftItem={{
//             title: "you are",
//             layout: null,
//             onPress: null,
//             icon: null,
//           }}
//           title="Settings"
//           rightItem={{
//             title: "  cute",
//             layout: null,
//             onPress: null,
//             icon: null,
//           }}
//           content="testcontentnotshowing??"
//           style={{backgroundColor: 'pink'}}
//         />

//         <View style={[styles.box, this.props.style]}>
//           <Image
//             source={require('../../img.png')}

//           />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   box: {
//     height: 30,
//     width: 30,
//     margin: 5,
//     backgroundColor: 'lightgrey',
//     borderColor: 'black',
//     borderWidth: 1
//   }
// });
