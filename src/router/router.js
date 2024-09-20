import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from '../screens/home/home';
import Login from '../screens/auth/login';
import SplashScreen from '../screens/slashScreen';
import Products from '../screens/products/products';
import Teams from '../screens/teams';
import AddMember from '../screens/addmember';
import ViewProducts from '../screens/products/viewProducts';

import AccountScreen from '../screens/account';
import CartScreen from '../screens/cart';
import DrawerScreen from '../components/drawer';

import { COLORS } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigationState } from '@react-navigation/native';

const Router = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  const TabBottom = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            if (route.name === 'HomeScreen') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
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
              }}>
                <Icon name={iconName} size={size} color={color} />
              </View>
            );
          },
          tabBarStyle: [{
            backgroundColor: COLORS.primary,
            borderRadius: 100,
            height: 70,
            padding: 10,
            paddingHorizontal: 10,
            alignItems: 'center',
            elevation: 100,
            margin: 5,
            position: 'absolute',
            bottom: 10,
          }],
          tabBarLabelStyle: {
            fontSize: 10,
            bottom: 5,
          },
        })}
        tabBarOptions={{
          activeTintColor: COLORS.secondry,
          inactiveTintColor: COLORS.white,

        }}
      >
        <Tab.Screen name="HomeScreen" component={Home} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />

      </Tab.Navigator>
    );
  };

  // Stack Navigator to include all screens
  const StackScreens = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='TabBottom' component={TabBottom} />
      </Stack.Navigator>
    );
  };

  // Drawer Navigator with Stack Navigator as its child
  const DrawerTab = () => {
   

    return (
      <Drawer.Navigator
        drawerContent={props => <DrawerScreen {...props} />}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: COLORS.white,
            height: 80
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <View style={{ paddingHorizontal: 10, paddingVertical: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
              <TouchableOpacity style={{ marginBottom: 10, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', backgroundColor:'rgba(0,0,0,.6)', elevation: 5, paddingHorizontal: 5, paddingVertical: 5, borderRadius: 30 }}>
                <View style={{ backgroundColor: COLORS.yellow, height: 30, width: 30, borderRadius: 100, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 5, elevation: 10 }}>
                  <Icon name="gift" size={20} color={COLORS.title} />
                </View>
                <Text style={{ marginHorizontal: 10, fontSize: 14, color: COLORS.white, fontWeight: '400' }}>Reward</Text>
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.toggleDrawer()}>
              <Icon name="menu" size={25} color={COLORS.secondry} />
            </TouchableOpacity>
          ),
        })}
      >
        <Drawer.Screen name='Home' component={StackScreens} />

      </Drawer.Navigator>
    );
  };

  // Main Stack with login and splash screens
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Home' component={DrawerTab} />
      <Stack.Screen name='SplashScreen' component={SplashScreen} />
      <Stack.Screen name='Teams' component={Teams} />
      <Stack.Screen name='AddMember' component={AddMember} />
      <Stack.Screen name='ViewProducts' component={ViewProducts} />
      <Stack.Screen name='Products' component={Products}/>
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
