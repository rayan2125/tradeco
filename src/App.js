import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router/router'
import { PaperProvider } from 'react-native-paper'
import { NativeBaseProvider } from 'native-base'

const App = () => {
  return (
    <NativeBaseProvider>

      <PaperProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </PaperProvider>
    </NativeBaseProvider>

  )
}

export default App

const styles = StyleSheet.create({})