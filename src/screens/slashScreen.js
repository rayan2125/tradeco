import { Animated, StyleSheet, View, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import navigation hooks
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { callAxiosGet } from '../services/api';
import { API_CONSTANTS } from '../constants/ApiCollection';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(-300)).current;
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      // Start the animation when the screen is focused
      const animateSplashScreen = () => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1, // Final opacity value
            duration: 1000, // Duration in milliseconds
            useNativeDriver: true,
          }),
          Animated.timing(translateXAnim, {
            toValue: 0, // Moves the image to the center (x = 0)
            duration: 1000, // Duration in milliseconds
            useNativeDriver: true,
          }),
        ]).start(async () => {
          // Check for token and navigate accordingly
          const token = await AsyncStorage.getItem('token');
          if (token) {
            await callAxiosGet(API_CONSTANTS.profile).then((res) => {
              let userDetails = res.data;
              if (userDetails.status === 'pending') {
                navigation.navigate('NewProfile');
              } else {
                navigation.replace('Home');
              }
            });
          } else {
            // If no token, navigate to Login screen
            navigation.replace('Login');
          }
        });
      };

      animateSplashScreen();

      // Cleanup animation on unfocus
      return () => {
        fadeAnim.setValue(0); // Reset animation values
        translateXAnim.setValue(-300);
      };
    }, [fadeAnim, translateXAnim, navigation])
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={{ height: 200, width: 300, resizeMode: 'contain' }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
