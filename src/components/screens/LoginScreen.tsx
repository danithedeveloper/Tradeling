import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks.ts';
import {LoginRequestParams} from '../../data';
import {loginUser} from '../../actions/authActions.ts';
import Container from '../elements/Container';
import {Button, ActivityLoader, Text, TextField} from '../elements';
import {View} from 'react-native';

type LoginScreenProps = {};

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const dispatch = useAppDispatch();
  const [userName, setUserName] = React.useState('mor_2314');
  const [password, setPassword] = React.useState('83r5^_');
  const {loading, error, isAuthenticated} = useAppSelector(state => state.auth);

  /*  const [loginParams, setLoginParams] = useState<LoginRequestParams>({
      username: userName,
      password: password,
    });*/

  /*React.useEffect(() => {
    setLoginParams(prevParams => ({
      ...prevParams,
      username: userName,
      password: password,
    }));
  }, [userName, password]);*/
  const _onUserNameFieldChange = (value: string) => {
    setUserName(value);
    /*    setLoginParams(prevParams => ({
          ...prevParams,
          username: userName,
          //password: password,
        }));*/
  };
  const _onPasswordFieldChange = (value: string) => {
    setPassword(value);
    /*setLoginParams(prevParams => ({
      ...prevParams,
      //username: userName,
      password: password,
    }));*/
  };

  function onLoginPress() {
    console.log('pressed');
    const loginParams: LoginRequestParams = {
      username: userName,
      password: password,
    };
    dispatch(loginUser(loginParams));
  }

  return (
    <Container
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          flexDirection: 'column',
          width: '80%',
          alignItems: 'center',
        }}>
        <TextField
          hasMargin
          value={userName}
          onChangeText={_onUserNameFieldChange}
          placeholder={'User Name'}
        />
        <TextField
          hasMargin
          value={password}
          onChangeText={_onPasswordFieldChange}
          placeholder={'Password'}
          secureTextEntry
        />
        <Button
          onPress={onLoginPress}
          style={{width: '60%', marginTop: 20}}
          isFullWidth>
          <Text isBold isWhite>
            Login
          </Text>
        </Button>
      </View>

      {/*<Button title="Press me" onPress={onLoginPress} />*/}
      <ActivityLoader isLoading={loading} text={'Please wait'} />
    </Container>
  );
};

export default LoginScreen;
