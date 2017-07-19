import React, { Component } from 'react';
import { AppRegistry, Alert } from 'react-native';
import AppIntro from 'react-native-app-intro';
import { markTutorialSeenTrue } from '../redux/realm';

class Intro extends Component {
  onSkipBtnHandle = (index) => {
    markTutorialSeenTrue();
    this.props.screenProps.toggle();
    console.log(index);
  }
  doneBtnHandle = () => {
    markTutorialSeenTrue();
    this.props.screenProps.toggle();
  }
  nextBtnHandle = (index) => {
    // Alert.alert('Next');
    console.log(index);
  }
  onSlideChangeHandle = (index, total) => {
    console.log(index, total);
  }
  render() {
    const pageArray = [{
      title: 'Welcome to kit!',
      description: 'Each day, your goal is to talk to everyone in the Today section.',
      img: require('../../img/tutorial1.png'),
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#fa931d',
      fontColor: '#fff',
      level: 10,
    }, {
      title: '',
      description: 'As you talk to people, you should swipe on the main screen to mark them as complete for the day.',
      img: require('../../img/tutorial2.png'),
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Get started!',
      description: "You should first import some contacts. You can then set how often you want to talk to each person. That's all for now!",
      img: require('../../img/tutorial3.png'),
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    }];
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        pageArray={pageArray}
      />
    );
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux';

const mapState = ({ store }) => ({ store });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Intro);
