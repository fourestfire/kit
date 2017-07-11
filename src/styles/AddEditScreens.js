import { StyleSheet } from 'react-native';
import { maxWidth } from './global';

export default StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headline: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  textWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    // backgroundColor: 'lavender',
    // flexDirection: 'column',
    height: 40,
    width: maxWidth - 50,
    margin: 10,
    // flex: 1,
  },
  textInput: {
    // backgroundColor: 'ghostwhite',
    width: maxWidth - 50,
    height: 40,
    // borderColor: 'lightgray',
    // borderRadius: 4,
    // borderBottomWidth: 1,
  },
  phoneInput: {
    color: 'blue'
  },

  actionButton: {
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: maxWidth
    // alignSelf: 'flex-end',
  },

  actionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '200'
  },

  spacer: {
    flex: 1,
  },

  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 30,
    // position: 'absolute',
    // paddingTop: 30,
    // paddingHorizontal: 10,
    // zIndex: 10
  }
});
