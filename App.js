'use strict';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import Today from './src/components/Today';
import store from './src/redux/store';

class kit extends React.Component {
  render () {
    return (
    <Provider store={store}>
      <Today />
    </Provider>
    );
  }
}

AppRegistry.registerComponent('kit', () => kit);
