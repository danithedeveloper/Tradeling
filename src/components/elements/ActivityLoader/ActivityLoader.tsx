import * as React from 'react';
import {View, ActivityIndicator} from 'react-native';

import styles from './styles';
import {color} from '../../../constants';
import Text from '../Text';

interface LoaderProps {
  isLoading: boolean;
  text: string;
}

const ActivityLoader: React.FC<LoaderProps> = ({isLoading, text}) => {
  return isLoading ? (
    <View style={styles.loading} pointerEvents={'box-only'}>
      <ActivityIndicator
        color={color.BLACK}
        style={{marginTop: 24}}
        size="large"
      />
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  ) : null;
};
export default ActivityLoader;
