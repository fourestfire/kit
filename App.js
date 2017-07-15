'use strict';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import SectionList from './src/components/SectionList';
import store from './src/redux/store';

class kit extends React.Component {
  render () {
    return (
    <Provider store={store}>
      <SectionList />
    </Provider>
    );
  }
}

AppRegistry.registerComponent('kit', () => kit);
