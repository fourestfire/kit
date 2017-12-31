import React, { Component } from 'react';
import { AppRegistry, Alert } from 'react-native';
import AppIntro from 'react-native-app-intro';
import { markTutorialSeenTrue } from '../redux/realm';
import Emoji from 'react-native-emoji';

class Intro extends Component {
  onSkipBtnHandle = (index) => {
    markTutorialSeenTrue();
    this.props.screenProps.toggle();
  }
  doneBtnHandle = () => {
    markTutorialSeenTrue();
    this.props.screenProps.toggle();
  }
  nextBtnHandle = (index) => {
  }
  onSlideChangeHandle = (index, total) => {
    // console.log(index, total);
  }
  render() {
    const pageArray = [{
      title: 'Welcome to Kit!',
      description: 'Each day, your goal is to talk to everyone in the Today section. Tap each checkmark as you finish talking to people.',
      img: require('../../img/tutorial1new.png'),
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#587CA1',
      fontColor: '#fff',
      fontSize: 50,
      fontWeight: '300',
      level: 10,
    }, {
      title: 'Call or Message',
      description: "Swipe on the home screen to quickly call or message your contacts from the app.",
      img: require('../../img/tutorial2new.png'),
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#5A5C8B',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Get started!',
      description: "First, import some contacts. You can set how often you want to keep in touch. That's all for now!",
      img: require('../../img/tutorial3new.png'),
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#E47569',
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
