import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Loading from '../../components/Loading';
import SignInContainer from '../SignIn/SignInContainer';
import AppointmentsContainer from '../Appointments/AppointmentsContainer';
import AppointmentFormContainer from '../AppointmentForm/AppointmentFormContainer';

const Stack = createStackNavigator();

export default function AppNavigation({isAppLoading, userToken, isSignout}) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAppLoading ? (
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{
              headerShown: false,
            }}
          />
        ) : userToken == null ? (
          <Stack.Screen
            name="SignIn"
            component={SignInContainer}
            options={{
              title: 'Sign in',
              animationTypeForReplace: isSignout ? 'pop' : 'push',
              headerShown: false,
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Appointments"
              component={AppointmentsContainer}
            />
            <Stack.Screen name="Form" component={AppointmentFormContainer} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
