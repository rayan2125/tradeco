import { Animated, StyleSheet, View, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value
  const translateXAnim = useRef(new Animated.Value(-300)).current; // Initial position off-screen to the left
  const navigation = useNavigation(); // Access navigation

  useEffect(() => {
    // Start the animation when the component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Final opacity value
        duration: 1000, // Duration in milliseconds
        useNativeDriver: true
      }),
      Animated.timing(translateXAnim, {
        toValue: 0, // Moves the image to the center (x = 0)
        duration: 1000, // Duration in milliseconds
        useNativeDriver: true
      })
    ]).start(async () => {
      // Check token in AsyncStorage after the animation completes
      const token = await AsyncStorage.getItem('token');

      if (token) {
        // If token exists, navigate to Home screen
        navigation.replace('Home');
      } else {
        // If no token, navigate to Login screen
        navigation.replace('Login');
      }
    });
  }, [fadeAnim, translateXAnim, navigation]);

  return (
    <View style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={{ height: 200, width: 300, resizeMode: 'contain' }}
        />
      {/* <Animated.View style={{ opacity: fadeAnim, transform: [{ translateX: translateXAnim }] }}>
      </Animated.View> */}
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
