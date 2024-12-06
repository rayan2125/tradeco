import { StyleSheet, Text, View, Alert, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../../components/button/button';
import { callAxios, callAxiosGet } from '../../services/api';
import { API_CONSTANTS } from '../../constants/ApiCollection';
import { Linking } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import Header from '../../components/header';
import { Divider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { removeAllCart } from '../../redux/Reducers/cart.redux';


const OrderPayment = ({ route }) => {

    const navigation = useNavigation();

    let details = route.params;
    let items = details.products;
    





    const handlePayment = async () => {

        navigation.navigate("PaymentMethod", details)
    };



    return (
        <>
            <Header
                title="CheckOut"

            />
            <ScrollView style={{ backgroundColor: COLORS.white }}>
                <View style={{ backgroundColor: COLORS.white, flex: 1 }} >
                    <Divider style={{ backgroundColor: COLORS.grey, height: 2 }} />
                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 18, color: COLORS.title, fontWeight: '500' }}>Product Details</Text>
                        {items.map((item, index) => (

                            <>
                                <View key={index} style={{ marginVertical: 5, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>

                                    <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.title, width: '30%' }}>
                                        {item.name}
                                    </Text>
                                    <Text style={{ fontSize: 16, color: COLORS.title, width: '40%', left: 20 }}>
                                        Quantity: {item.quantity}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: COLORS.title, width: '40%' }}>
                                        Price: {'\u20B9'}{item.price}
                                    </Text>
                                </View>
                                <View style={{ borderBottomColor: COLORS.grey, borderBottomWidth: 1, borderStyle: 'dashed', marginVertical: 10 }} />
                            </>
                        ))}
                    </View>
                    <Divider style={{ backgroundColor: COLORS.grey, height: 2 }} />
                    <View>
                        <Text style={{ fontSize: 20, color: COLORS.title, margin: 10, fontWeight: '700' }}>Price Details</Text>
                        <View style={{ margin: 10, padding: 5 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: COLORS.title, fontSize: 16, fontWeight: '700' }}>Total Amount</Text>
                                <Text style={{ color: COLORS.title, fontSize: 16, fontWeight: '700' }}>{'\u20B9'}{details.totalAmount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: COLORS.title, fontSize: 16, fontWeight: '700' }}>Discount</Text>
                                <Text style={{ color: COLORS.title, fontSize: 16, fontWeight: '700' }}>0.00</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: COLORS.title, fontSize: 16, fontWeight: '700' }}>Delivery Charges</Text>
                                <Text style={{ color: COLORS.primary, fontSize: 16, fontWeight: '700' }}>FREE Delivery</Text>
                            </View>

                            <View style={{ borderBottomColor: COLORS.grey, borderBottomWidth: 1, borderStyle: 'dashed', marginVertical: 10 }} />

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={{ color: COLORS.title, fontSize: 16, fontWeight: '700' }}>Total Amount</Text>
                            <Text style={{ color: COLORS.title, fontSize: 16, fontWeight: '700' }}>{'\u20B9'}{details.totalAmount} </Text>
                        </View>
                        <Divider style={{ backgroundColor: COLORS.grey, height: 2 }} />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 18, color: COLORS.title, fontWeight: '500' }}>Delivery To</Text>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.title }}>{details.name}</Text>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.title }}>{details.address} | {details.address2} | {details.city} | {details.state} | {details.zip}</Text>
                    </View>
                    

                    <View style={{ margin: 10 }}>

                        <Button title="Make Payment" onPress={() => handlePayment('PhonePe')} />
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default OrderPayment;

const styles = StyleSheet.create({});
