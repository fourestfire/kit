import { StyleSheet } from 'react-native';
import { maxHeight, maxWidth } from './global';

export default StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headlineForAdd: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  headlineForEdit: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginTop: 0,
    marginBottom: 23,
    marginHorizontal: 20,
  },
  textWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    // backgroundColor: 'lavender',
    // flexDirection: 'column',
    height: 50,
    width: maxWidth - 50,
    margin: 10,
    // flex: 1,
  },
  contactHistory: {
    // backgroundColor: 'green',
    height: 40,
    width: maxWidth - 50,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#bfbfbf',
  },
  textInput: {
    // backgroundColor: 'ghostwhite',
    width: maxWidth - 50,
    height: 50,
    // borderColor: 'lightgray',
    // borderRadius: 4,
    // borderBottomWidth: 1,
  },
  helpText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'grey',
    margin: -4
  },
  helpTextForHistory: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'grey',
    marginLeft: -4,
    marginBottom: 10,
  },
  contactBorder: {
    // borderColor: 'grey',
    // borderWidth: 1,
  },
  historyRow: {
    color: '#333',
    marginLeft: -4
  },
  phoneInput: {
    color: 'blue'
  },
  segmentedWrapper: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#bfbfbf',
    // backgroundColor: 'lavender',
    // flexDirection: 'column',
    height: 60,
    width: maxWidth - 50,
    margin: 7,
    // flex: 1,
  },
  segmentedControl: {
    marginTop: 12,
    // backgroundColor: 'blue',
    // color: 'blue'
  },

  flexWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

  actionButton: {
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: maxWidth * 2 / 3
    // alignSelf: 'flex-end',
  },
  delete: {
    backgroundColor: 'red',
    width: maxWidth * 1 / 3
  },
  actionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '200'
  },

  topSpacer: {
    height: 50,
  },

  bottomSpacer: {
    flex: 1,
    height: 20,
  },

  closeButton: {
    // alignSelf: 'flex-end',
    // marginRight: 30,
    height: maxHeight / 10,
    width: maxHeight / 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'grey',
    position: 'absolute',
    right: 0,
    top: 0,
    // marginTop: maxHeight / 4,
    // paddingHorizontal: 10,
    zIndex: 10
  },
});
