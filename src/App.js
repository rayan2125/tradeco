import { View, Text } from 'react-native'
import React from 'react'
import Home from './screens/home/home'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router/router'

const App = () => {
  return (
    <NavigationContainer>
      <Router/>
    </NavigationContainer>
  )
}

export default App