import Dimensions from 'Dimensions';
import { StyleSheet } from 'react-native';
let { height, width } = Dimensions.get('window');

export const maxHeight = height;
export const maxWidth = width;

export const toastStyle = {
  width: 200,
  height: 50,
  backgroundColor: '#CEF0A4',
  color: '#555555',
  borderWidth: 0,
  borderRadius: 15,
};

// export default StyleSheet.create({
//   backgroundColor: 'aliceblue',
// });
