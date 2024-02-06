import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

function fetchResponse(instance: any, config: any) {
  return instance(config)
    .then((response: any) => {
      //const {data, status, statusText} = response;

      /*let responseData = data;
      if (responseData != null) {
        responseData.status = status;
      } else {
        responseData = {
          status,
          success: false,
          errorMessage: 'Sorry, something went wrong, Please try again',
        };
        console.log('in else', responseData);
      }*/
      //console.log(response);

      return response;
    })
    .catch((error: any) => {
      //const {data, status} = error;
      //console.log('data', data);
      console.log('error', error);
    });
}

export const api = async (config: any) => {
  //console.log("Config: ", getPreferredLanguageCode(store.getState()))
  let headers;
  let instance;
  axios.defaults.timeout = 600000;
  instance = axios.create({
    baseURL: config.baseURL ? config.baseURL : 'https://fakestoreapi.com/',
  });

  let systemVersion = DeviceInfo.getSystemVersion();
  let version = DeviceInfo.getVersion();
  let deviceId = DeviceInfo.getDeviceId();
  const deviceName = await DeviceInfo.getDeviceName();

  if (config.headers) {
    headers = {...config.headers};
  } else {
    headers = {
      Accept: 'application/json',
      // 'Accept-Language': getPreferredLanguageCode(store.getState()),
      // Authorization: getAccessToken(store.getState()),
      'Device-Details': {
        DeviceName: deviceName,
        DeviceOSType: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
        DeviceOSVersion: systemVersion,
        AppVersion: version,
        DeviceId: deviceId,
      },
    };
  }

  /*instance.interceptors.response.use(
    response => response,
    error => {
      console.log('errorerror', error);
      console.log('errorerror response', error.response);
      const {status} = error.response;
      if (status == 401) {
        store.dispatch(resetAuthState(store.getState()));
        clearAll();
        // AsyncStorage.removeItem('USER_INFO')
        // NavigatorService.navigate("AuthenticationRoutes")
      }
      return Promise.reject(error.response);
    },
  );*/

  delete config.baseURL;
  delete config.headers;
  console.log(
    JSON.stringify({...config, headers, ...{responseType: 'application/json'}}),
  );
  return fetchResponse(instance, {
    ...config,
    headers,
    // ...{responseType: 'application/json'},
    ...{responseType: 'json'},
  });
};
