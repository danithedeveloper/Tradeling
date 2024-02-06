import {StyleSheet} from 'react-native';
import {color} from '../../../constants';

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    color: color.BLACK,
    width: '100%',
    textAlign: 'center',
    paddingBottom: 18,
    fontSize: 24,
    fontWeight: '500',
  },
});

export default styles;
