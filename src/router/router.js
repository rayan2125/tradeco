import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Profile from '../screens/account/profile';
import { useSelector } from 'react-redux';
import NewProfile from '../screens/account/newProfile';
import Payment from '../screens/payment/payment';
import Order from '../screens/order/order';
import OfferProduct from '../screens/products/offerProduct';
import TeamsMember from '../screens/teamsMember';
import OrderPayment from '../screens/payment/orderPayment';
import AfterPayment from '../screens/payment/afterPayment';
import MemberShip from '../screens/payment/membership';
import OrderInfo from '../screens/order/orderInfo';
import GifScreens from '../screens/gif/gifScreens';
import PaymentMethod from '../screens/payment/paymentMethod';
import ForgotPwdScreen from '../screens/forgotPwd';
import Search from '../screens/products/search';


const Router = () => {
  let coin = useSelector(state => state.auth.coin)

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();


  const TabBottom = ({ setCurrentState }) => {

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
       
        tabBarOptions={{
          activeTintColor: COLORS.primary,
          inactiveTintColor: COLORS.secondry,
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        {/* <Tab.Screen name="Order" component={Order} /> */}
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    );
  };


  // Stack Navigator to include all screens


  // Drawer Navigator with Stack Navigator as its child
  const DrawerTab = () => {
    const navigation = useNavigation()
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
                  {/* <Icon name='' size={25} color={COLORS.title} /> */}
                  <Image source={require("../assets/coin.png")} style={{ height: 50, width: 50, resizeMode: 'contain' }} />
                  <Text style={{ fontSize: 18, color: COLORS.title, fontWeight: '600' }}>{coin}</Text>
                </View>
                <View style={{ paddingHorizontal: 10, paddingVertical: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("OfferProduct")}
                    style={{ marginBottom: 10, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,.6)', elevation: 5, paddingHorizontal: 5, paddingVertical: 5, borderRadius: 30 }}>
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
          {props => <TabBottom {...props} />}
        </Drawer.Screen>

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
      <Stack.Screen name='Products' component={Products} />
      <Stack.Screen name='Cart' component={CartScreen} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='NewProfile' component={NewProfile} />
      <Stack.Screen name='Payment' component={Payment} />
      <Stack.Screen name='Order' component={Order} />
      <Stack.Screen name='OfferProduct' component={OfferProduct} />
      <Stack.Screen name='TeamsMember' component={TeamsMember} />
      <Stack.Screen name='OrderPayment' component={OrderPayment} />
      <Stack.Screen name='AfterPayment' component={AfterPayment} />
      <Stack.Screen name='MemberShip' component={MemberShip} />
      <Stack.Screen name='OrderInfo' component={OrderInfo} />
      <Stack.Screen name='GifScreens' component={GifScreens} />
      <Stack.Screen name='PaymentMethod' component={PaymentMethod} />
      <Stack.Screen name='ForgotPwdScreen' component={ForgotPwdScreen} />
      <Stack.Screen name='Search' component={Search} />
    </Stack.Navigator>

  );
};

export default Router;

const styles = StyleSheet.create({});
