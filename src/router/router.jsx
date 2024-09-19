import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignInScreen from '../screens/signIn';
import SignUpScreen from '../screens/signUp';
import ForgotPwdScreen from '../screens/forgotPwd';
import HomeScreen from '../screens/home/home';


import CartScreen from '../screens/cart';
import AccountScreen from '../screens/account';
import RestaurentDetails from '../screens/restaurent';
import DrawerContent from '../components/drawer';

import { COLORS, SIZES } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Login from '../screens/auth/login';
import SlashScreen from '../screens/slashScreen';
import Setting from '../screens/history';
import { View } from 'react-native';
import Products from '../screens/products/products';
import Teams from '../screens/teams';
import AddMember from '../screens/addmember';
import ViewProducts from '../screens/products/viewProducts';

// Auth Stack
// const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator()
function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen
        name="ForgotPwd"
        component={ForgotPwdScreen}
        options={{
          headerTitle: null,
          headerBackTitle: 'back',
          headerBackTitleStyle: { fontWeight: 'bold' },
          headerTintColor: COLORS.white,
          headerStyle: { backgroundColor: COLORS.primary },
        }}
      />
    </AuthStack.Navigator>
  );
}

// Home Stack
const HomeStack = createNativeStackNavigator();



// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Setting') {
            iconName = focused ? 'cog' : 'cog';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'account' : 'account-outline';
          }
          return (
            <View style={{
              backgroundColor: focused ? COLORS.white : 'transparent',
              width: 80,
              alignItems: 'center',
              borderRadius: 50,
              paddingHorizontal: 5,
              paddingVertical: 3,
              // bottom:7

            }}>
              {/* Remove the extra semicolon here */}
              <Icon name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarVisible: false,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          // borderTopLeftRadius: 60,
          // borderTopRightRadius: 60,
          borderRadius: 100,
          height: 70,
          padding: 10,
          paddingHorizontal: 10,
          alignItems: 'center',
          elevation: 100,
          margin: 5
        },
        tabBarLabelStyle: {
          fontSize: 10,
          bottom: 5, // Move the label closer to the bottom
        },
      })}
      tabBarOptions={{
        activeTintColor: COLORS.secondry,
        inactiveTintColor: COLORS.white,

        labelStyle: { fontWeight: 'bold' },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Setting" component={Setting} />
      
    </Tab.Navigator>
  );
}




// Main Navigation Container
export default function Router() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName='SlashScreen' >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Home' component={BottomTabNavigator} />
      <Stack.Screen name='SlashScreen' component={SlashScreen} />
      <Stack.Screen name='RestaurentDetails'  component={RestaurentDetails}/>
      <Stack.Screen name='Products' component={Products}/>
      <Stack.Screen name='Teams' component={Teams}/>
      <Stack.Screen name='AddMember' component={AddMember}/>
      <Stack.Screen name='ViewProducts' component={ViewProducts}/>
    </Stack.Navigator>
  );
}
