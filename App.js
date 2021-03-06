'use strict';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { initializeSettingsIfNeeded, setLastLogin } from './src/redux/realm';
import Mixpanel from 'react-native-mixpanel';
import TabNav from './src/components/TabNav';

class kit extends React.Component {
  componentWillMount() {
    // init Mixpanel SDK with project token
    Mixpanel.sharedInstanceWithToken('7d05fad0f2bf12130baec860512ba4c2');

    // initialize global settings if uninitialized
    initializeSettingsIfNeeded();

    // login analytics logic: refresh last login date and increment login count
    setLastLogin();
   }

  render () {
    return (
    <Provider store={store}>
      <TabNav />
    </Provider>
    );
  }
}

AppRegistry.registerComponent('kit', () => kit);
