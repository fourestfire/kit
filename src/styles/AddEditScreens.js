import { StyleSheet } from 'react-native';
import { maxHeight, maxWidth } from './global';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  helpTextView: {
    height: 50,
    width: maxWidth - 50,
    margin: 10,
  },
  helpText: {
    fontSize: 18,
    color: 'black',
    margin: -4
  },
  headlineForAdd: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  headlineForEdit: { // unnecessary if there's no headline that says "Edit Contact"
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
    fontSize: 18,
    // borderColor: 'lightgray',
    // borderRadius: 4,
    // borderBottomWidth: 1,
  },
  textInputForNotes: {
    width: maxWidth - 50,
    height: 70,
    fontSize: 18,
    borderColor: '#bfbfbf',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: '#f8f8f8',
  },
  textInputHalf: {
    // backgroundColor: 'ghostwhite',
    width: maxWidth / 2 - 35,
    height: 50,
    fontSize: 18,
    // borderColor: 'lightgray',
    // borderRadius: 4,
    // borderBottomWidth: 1,
  },
  formLabel: {
    fontSize: 18,
    color: 'black',
    margin: -4
  },
  subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'grey',
    margin: -4
  },
  subtitleForHistory: {
    fontSize: 16,
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
    fontSize: 16,
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
    backgroundColor: 'hsla(240, 100%, 27%, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: maxWidth * 2 / 3 - 30,
    borderRadius: 5,
    borderColor: 'hsla(240, 100%, 27%, 0.9)', // dark blue base
    borderLeftWidth: 1.2,
    borderRightWidth: 1.2,
    borderTopWidth: 1.2,
    borderBottomWidth: 3,
    borderBottomColor: 'darkblue',
    marginHorizontal: 6,
  },

  large: {
    height: 60,
    width: maxWidth * 5 / 6 - 30,
  },

  long: {
    width: maxWidth - 45,
  },

  importOptions: {
    height: 50,
    width: maxWidth - 45,
  },

  // original version
  // actionButton: {
  //   backgroundColor: 'darkblue',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: 50,
  //   width: maxWidth * 2 / 3
  //   // alignSelf: 'flex-end',
  // },

  delete: {
    backgroundColor: 'red',
    width: maxWidth * 1 / 3 - 30,
    borderColor: 'red',
    borderBottomColor: 'darkblue',
  },
  actionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300'
  },

  tenSpacer: {
    height: 10,
  },

  topFlex: {
    flex: 1,
  },

  bottomSpacer: { // not in use on edit screen
    flex: 1,
  },

  closeButton: { // not in use on edit screen
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
