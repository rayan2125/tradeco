import { View, Text } from 'react-native'
import React from 'react'
import Home from './screens/home/home'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router/router'
import store from './redux/store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { NativeBaseProvider } from 'native-base';
const App = () => {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>

          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </NativeBaseProvider>

      </PersistGate>
    </Provider>
  )
}

export default App