import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SCREEN_NAME} from '../../../../constants';
import {LoginScreen} from '../../../screens';

type PublicStackProps = {};
const Stack = createNativeStackNavigator();
const PublicStack: React.FC<PublicStackProps> = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN_NAME.LOGIN_SCREEN}>
      <Stack.Screen name={SCREEN_NAME.LOGIN_SCREEN} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default PublicStack;
