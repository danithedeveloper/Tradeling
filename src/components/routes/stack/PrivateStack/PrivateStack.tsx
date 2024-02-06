import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAME} from '../../../../constants';
import {HomeScreen} from '../../../screens';

type PrivateStackProps = {};
const Stack = createNativeStackNavigator();
const PrivateStack: React.FC<PrivateStackProps> = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN_NAME.HOME_SCREEN}>
      <Stack.Screen name={SCREEN_NAME.HOME_SCREEN} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default PrivateStack;
