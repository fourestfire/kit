/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 * @providesModule ListViewExample
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = ReactNative;
import Header from './Header'


var ListViewSimpleExample = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._genRows({})),
    };
  },

  _pressData: ({}: {[key: number]: boolean}),


  componentWillMount: function() {
    this._pressData = {};
  },

  render: function() {
    return (
      <View>
        <Header
          leftItem={{
            title: "  ",
            layout: null,
            onPress: null,
            icon: null,
          }}
          title="All Contacts"
          rightItem={{
            title: "add",
            layout: null,
            onPress: null,
            icon: null,
          }}
          content="testcontentnotshowing??"
          style={{backgroundColor: 'pink'}}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
        />
      </View>
    );
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    var rowHash = Math.abs(hashCode(rowData));
    return (
      <TouchableHighlight onPress={() => {
          this._pressRow(rowID);
          highlightRow(sectionID, rowID);
        }}>
        <View>
          <View style={styles.row}>
             <Text style={styles.text}>
              {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (pressed)' : '';
      dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
  },

  _pressRow: function(rowID: number) {
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )});
  },

  // _renderSeparator: function(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
  //   return (
  //     <View
  //       key={`${sectionID}-${rowID}`}
  //       style={{
  //         height: adjacentRowHighlighted ? 4 : 1,
  //         backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
  //       }}
  //     />
  //   );
  // }
});


var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderColor: 'lightgrey'
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
});

module.exports = ListViewSimpleExample;


// import React from 'react'
// import { View, Text, ListView, Alert, StyleSheet } from 'react-native'
// import { connect } from 'react-redux'

// // For empty lists
// // import AlertMessage from '../Components/AlertMessage'

// // Styles
// // import styles from './Styles/ListviewExampleStyles'

// class ListviewExample extends React.Component {
//   constructor (props) {
//     super(props)
//     /* ***********************************************************
//     * STEP 1
//     * This is an array of objects with the properties you desire
//     * Usually this should come from Redux mapStateToProps
//     *************************************************************/
//     const dataObjects = [
//     { Bill: { frequency: 'Daily', lastContact: '04/26/17' }},
//     { Margaret: { frequency: 'Bi-weekly', lastContact: '04/20/17'}},
//     { Jack: { frequency: 'Weekly', lastContact: '04/29/17'}}
//     ]

//     /* ***********************************************************
//     * STEP 2
//     * Teach datasource how to detect if rows are different
//     * Make this function fast!  Perhaps something like:
//     *   (r1, r2) => r1.id !== r2.id}
//     *************************************************************/
//     const rowHasChanged = (r1, r2) => r1 !== r2

//     // DataSource configured
//     const ds = new ListView.DataSource({rowHasChanged})

//     // Datasource is always in state
//     this.state = {
//       dataSource: ds.cloneWithRows(dataObjects)
//     }
//   }

//   /* ***********************************************************
//   * STEP 3
//   * `renderRow` function -How each cell/row should be rendered
//   * It's our best practice to place a single component here:
//   *
//   * e.g.
//     return <MyCustomCell title={rowData.title} description={rowData.description} />
//   *************************************************************/
//   renderRow (rowData) {
//     return (
//       <View style={styles.row}>
//         <Text style={styles.boldLabel}>{rowData.name}</Text>
//         <Text style={styles.label}>{rowData.frequency}</Text>
//         <Text style={styles.label}>{rowData.lastContact}</Text>
//       </View>
//     )
//   }

//   /* ***********************************************************
//   * STEP 4
//   * If your datasource is driven by Redux, you'll need to
//   * reset it when new data arrives.
//   * DO NOT! place `cloneWithRows` inside of render, since render
//   * is called very often, and should remain fast!  Just replace
//   * state's datasource on newProps.
//   *
//   * e.g.
//     componentWillReceiveProps (newProps) {
//       if (newProps.someData) {
//         this.setState({
//           dataSource: this.state.dataSource.cloneWithRows(newProps.someData)
//         })
//       }
//     }
//   *************************************************************/

//   // Used for friendly AlertMessage
//   // returns true if the dataSource is empty
//   noRowData () {
//     return this.state.dataSource.getRowCount() === 0
//   }

//   render () {
//     return (
//       <View style={styles.container}>
//         <Alert title='Nothing to See Here, Move Along' show={this.noRowData()} />
//         <ListView
//           contentContainerStyle={styles.listContent}
//           dataSource={this.state.dataSource}
//           renderRow={this.renderRow}
//           pageSize={15}
//         />
//       </View>
//     )
//   }
// }

// /* -------------------<   CONTAINER   >-------------------- */

// import { addContactSync, removeContactSync } from '../redux/reducer';

// const mapState = ({ store }) => ({ store });
// const mapDispatch = ({ addContactSync, removeContactSync });

// export default connect(mapState, mapDispatch)(ListviewExample);

// /* -------------------<   STYLES   >-------------------- */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//     backgroundColor: 'white'
//   },
//   row: {
//     flex: 1,
//     backgroundColor: 'salmon',
//     marginVertical: 5,
//     justifyContent: 'center'
//   },
//   boldLabel: {
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     color: 'aliceblue',
//     textAlign: 'center',
//     marginVertical: 5
//   },
//   label: {
//     textAlign: 'center',
//     color: 'aliceblue',
//     marginBottom: 5
//   },
//   listContent: {
//     marginTop: 10
//   }
// })
