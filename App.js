'use strict';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import Main from './src/components/Main';
import store from './src/redux/store';

class kit extends React.Component {
  render () {
    return (
    <Provider store={store}>
      <Main />
    </Provider>
    );
  }
}

AppRegistry.registerComponent('kit', () => kit);
