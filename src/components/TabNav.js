import { TabNavigator } from 'react-navigation';
import Today from './Today';
import FlatView from './FlatView';

// This "component" exists purely to add tab navigation. Two tabs are visible at the start.
// The Today and AllContacts components each use a separate stack navigator.

export default kit = TabNavigator({
    Today: {
      screen: Today,
      navigationOptions: {
        header: { visible: false },
      },
    },
    AllContacts: {
      screen: FlatView,
      navigationOptions: {
        header: { visible: false },
      },
    },
  }, {
    headerMode: 'screen',  // ??
    style: {
      backgroundColor: 'purple'
    },
    tabBarOptions: {
      activeTintColor: 'purple',
      style: {
        backgroundColor: 'transparent',
        height: 60,
        // marginTop: 70
      },
      labelStyle: {
        fontSize: 14,
        fontWeight: '300',
      },
    }
  }
);
