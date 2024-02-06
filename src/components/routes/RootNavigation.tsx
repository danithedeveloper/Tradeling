import {useAppSelector} from '../../hooks.ts';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {NAV_STACK_NAME} from '../../constants';
import PrivateStack from './stack/PrivateStack';
import PublicStack from './stack/PublicStack';

const RootStack = createNativeStackNavigator();
const RootNavigation = () => {
  const flex = 1;
  /*const {theme} = useContext(ThemeContext);
  const flex = 1;
  const rootContainerBackgroundColor =
    theme === 'light'
      ? lightTheme.colors.background
      : darkTheme.colors.background;
      */

  /*  const screenOptions =
      Platform.OS === 'ios'
        ? {
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }
        : {
            ...TransitionPresets.FadeFromBottomAndroid,
          };*/

  const {isAuthenticated} = useAppSelector(state => state.auth);

  return (
    <NavigationContainer /*theme={theme === 'light' ? lightTheme : darkTheme}*/>
      <View style={{flex /*, backgroundColor: rootContainerBackgroundColor*/}}>
        {/*<StatusBar
          hidden
          backgroundColor={
            theme === 'light'
              ? lightTheme.colors.background
              : darkTheme.colors.background
          }
          barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        />*/}
        <RootStack.Navigator>
          {isAuthenticated ? (
            <RootStack.Screen
              name={NAV_STACK_NAME.PRIVATE_STACK}
              options={{headerShown: false}}
              component={PrivateStack}
            />
          ) : (
            <RootStack.Screen
              options={{
                headerTransparent: true,
                //headerStatusBarHeight: 0,
                title: '',
                headerBackTitleVisible: false,
              }}
              name={NAV_STACK_NAME.PUBLIC_STACK}
              component={PublicStack}
            />
          )}
        </RootStack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default RootNavigation;
