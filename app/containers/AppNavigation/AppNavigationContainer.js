import React from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import AppNavigation from './AppNavigation';
import {tokenKey} from '../../config/constants';

function AppContainer({isAppLoading, userToken, isSignout, dispatch}) {
  React.useEffect(() => {
    const checkIfSignedIn = async () => {
      let userToken = null;

      try {
        userToken = await AsyncStorage.getItem(tokenKey);
      } catch (e) {
        // Restoring token failed
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    checkIfSignedIn();
  }, [dispatch]);

  return (
    <AppNavigation
      isAppLoading={isAppLoading}
      userToken={userToken}
      isSignout={isSignout}
    />
  );
}

function mapsStateToProps({authentication}) {
  return {...authentication};
}

export default connect(mapsStateToProps)(AppContainer);
