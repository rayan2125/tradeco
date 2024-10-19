import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import Profile from '../screens/account/profile';
import { useSelector } from 'react-redux';
import NewProfile from '../screens/account/newProfile';
import Payment from '../screens/payment/payment';
import Order from '../screens/order/order';

const Router = () => {
  let userDetails = useSelector(state => state.auth.adduser)
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();
 
 
  const TabBottom = ({setCurrentState}) => {
    
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
         
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Order') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'account' : 'account-outline';
            }
            return (
              <View style={{
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
          tabBarStyle: [
            {
              backgroundColor: COLORS.white,
              borderRadius: 100,
              height: 70,
              padding: 10,
              paddingHorizontal: 10,
              alignItems: 'center',
              elevation: 100,
              margin: 5,
              position: 'absolute',
              bottom: 10,
              display: route.name === "Order" ? 'none' : 'flex'
            },
            // Hide the tab bar on the 'Order' screen
            route.name === 'Order' ? { display: 'none' } : null,
            
          ],
          tabBarLabelStyle: {
            fontSize: 10,
            bottom: 5,
          },
        })}
        // onTabPress={({ route }) => console.log("lll",route.name)} 
        tabBarOptions={{
          activeTintColor: COLORS.primary,
          inactiveTintColor: COLORS.secondry,
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Order" component={Order} />
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
    const [currentState, setCurrentState] = useState('Home')
    console.log(currentState)
    let data = "routing setting"
    return (
      <Drawer.Navigator
        drawerContent={props => <DrawerScreen {...props} />}
        screenOptions={({ navigation, route }) => ({

          headerStyle: {
            backgroundColor: COLORS.white,
            height: 80
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          headerRight: () => (
            <>
              <View style={{ flexDirection: 'row' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name='wallet' size={25} color={COLORS.title} />
                  <Text style={{ fontSize: 18, color: COLORS.title, fontWeight: '600' }}>{userDetails.wallet} {`\u20B9`} </Text>
                </View>
                <View style={{ paddingHorizontal: 10, paddingVertical: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                  <TouchableOpacity style={{ marginBottom: 10, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,.6)', elevation: 5, paddingHorizontal: 5, paddingVertical: 5, borderRadius: 30 }}>
                    <View style={{ backgroundColor: COLORS.yellow, height: 30, width: 30, borderRadius: 100, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 5, elevation: 10 }}>
                      <Icon name="gift" size={20} color={COLORS.title} />
                    </View>
                    <Text style={{ marginHorizontal: 10, fontSize: 14, color: COLORS.white, fontWeight: '400' }}>Reward</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ),
          headerLeft: () => (
            <>

              <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.toggleDrawer()}>
                <Icon name="menu" size={25} color={COLORS.secondry} />
              </TouchableOpacity>
            </>
          ),
        })}
      >

        <Drawer.Screen name='Home'>
        {props => <TabBottom {...props} setCurrentState={setCurrentState} />}
        </Drawer.Screen>

      </Drawer.Navigator>
    );
  };

  // Main Stack with login and splash screens
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Payment'>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Home' component={DrawerTab} />
      <Stack.Screen name='SplashScreen' component={SplashScreen} />
      <Stack.Screen name='Teams' component={Teams} />
      <Stack.Screen name='AddMember' component={AddMember} />
      <Stack.Screen name='ViewProducts' component={ViewProducts} />
      <Stack.Screen name='Products' component={Products} />
      <Stack.Screen name='Cart' component={CartScreen} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='NewProfile' component={NewProfile} />
      <Stack.Screen name='Payment' component={Payment} />
    </Stack.Navigator>

  );
};

export default Router;

const styles = StyleSheet.create({});
