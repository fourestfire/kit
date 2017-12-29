'use strict';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { initializeSettingsIfNeeded, setLastLogin } from './src/redux/realm';
import Mixpanel from 'react-native-mixpanel';
import Intro from './src/components/Intro';
import Today from './src/components/Today';

class kit extends React.Component {
  componentWillMount() {
     // init Mixpanel SDK with project token
     Mixpanel.sharedInstanceWithToken('7d05fad0f2bf12130baec860512ba4c2');

     console.log('creating initial')

     // login analytics logic: refresh last login date and increment login count
     setLastLogin();
   }

  render () {
    return (
    <Provider store={store}>
      <Today />
    </Provider>
    );
  }
}

AppRegistry.registerComponent('kit', () => kit);
