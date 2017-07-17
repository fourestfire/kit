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
    marginTop: 10,
    marginBottom: 30,
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
  phoneInput: {
    color: 'blue'
  },
  segmentedWrapper: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#bfbfbf',
    // backgroundColor: 'lavender',
    // flexDirection: 'column',
    height: 70,
    width: maxWidth - 50,
    margin: 10,
    // flex: 1,
  },
  segmentedControl: {
    marginTop: 20,
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
    width: maxWidth * 3 / 4
    // alignSelf: 'flex-end',
  },
  delete: {
    backgroundColor: 'red',
    width: maxWidth * 1 / 4
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
  }
});
