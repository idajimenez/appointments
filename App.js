import * as React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import AppNavigation from './app/containers/AppNavigation/AppNavigationContainer';
import * as reducers from './app/redux';
import 'react-native-gesture-handler';

const appReducer = combineReducers({...reducers});
const store = createStore(appReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
