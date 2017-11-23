import { StyleSheet } from 'react-native';
import { maxHeight, maxWidth } from './global';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  headlineForAdd: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  headlineForEdit: { // will be unnecessary if there's no headline that says "Edit Contact"
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
  notesWrapper: {
    width: maxWidth - 50,
    marginHorizontal: 10,
    marginTop: 10,
    paddingBottom: 10,
    height: 100,
  },
  textWrapperHalf: {
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    // backgroundColor: 'lavender',
    // flexDirection: 'column',
    height: 50,
    width: maxWidth / 2 - 35,
    margin: 10,
    // flex: 1,
  },
  contactHistory: {
    // backgroundColor: 'green',
    width: maxWidth - 50,
    paddingTop: 10,
    borderTopWidth: 1, // special borderTop property to separate item from group segmentedcontrol
    borderTopColor: '#bfbfbf',
  },
  textInput: {
    // backgroundColor: 'ghostwhite',
    width: maxWidth - 50,
    height: 50,
    fontSize: 15,
    // borderColor: 'lightgray',
    // borderRadius: 4,
    // borderBottomWidth: 1,
  },
  textInputForNotes: {
    width: maxWidth - 50,
    height: 70,
    fontSize: 15,
    borderColor: '#bfbfbf',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  textInputHalf: {
    // backgroundColor: 'ghostwhite',
    width: maxWidth / 2 - 35,
    height: 50,
    fontSize: 15,
    // borderColor: 'lightgray',
    // borderRadius: 4,
    // borderBottomWidth: 1,
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'grey',
    margin: -4
  },
  subtitleForHistory: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'grey',
    marginLeft: -4,
    marginBottom: 10,
  },
  subtitleForNotes: {
    marginBottom: 7,
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
    height: 50,
    width: maxWidth - 50,
    // margin: 10,
    marginTop: 7,
    marginBottom: 2,
    marginHorizontal: 10,
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
    height: 10,
  },

  bottomSpacer: { // not in use on edit screen
    flex: 1,
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
