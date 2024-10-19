import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Alert, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { Divider, Icon } from 'react-native-paper'
import { callAxios, callAxiosWithFormData } from '../../services/api'
import CartComponent from '../../components/cartComponent'

import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import RBSheet from 'react-native-raw-bottom-sheet';

import { COLORS } from '../../constants/theme'
import Button from '../../components/button/button'
import { Column } from 'native-base'
import Header from '../../components/header'
import { API_CONSTANTS } from '../../constants/ApiCollection'
import { removeAllCart, removeAllcart, removeCart } from '../../redux/Reducers/cart.redux'
const CartScreen = ({ }) => {
    let dispatch = useDispatch()
    const cartItems = useSelector(state => state?.cart?.cartList)
    let userDetails = useSelector(state => state.auth.adduser)
    const refRBSheet = useRef();
    const navigation = useNavigation()
    const selectedAddress = useSelector(state => state);
    let phone = userDetails.phone;
    let name = userDetails.name;
    let email = userDetails.email;
    let city = userDetails.city;
    let address = userDetails.address
    let address2 = userDetails.address2
    let uState = userDetails.state
    let zip = userDetails.zip
    const handleOrder = async () => {
        refRBSheet.current.close()
        const orderItems = cartItems.map((item) => {
            // console.log(item)
        });


        const req = {
            name: name,
            email: email,
            phone: phone,
            city: city,
            address: address,
            address2: address2,
            state: uState,
            zip: zip,
            products: [
                {
                    product_id: 13,
                    quantity: 2,
                    price: 900.00
                }
            ],
            paymentMethod: "COD",
            deductRewardPoints: 0
        }



        await callAxios(API_CONSTANTS.createOrder, req).then((res) => {

            if (res.success === true) {
                dispatch(removeAllCart())

            } else {

            }
            // if (res.data) {
            //     Alert.alert(
            //         "Order Confirmed",
            //         "Your order has been placed successfully!",
            //         [
            //             {
            //                 text: "OK",
            //                 // onPress: () => navigation.navigate('ProceedPayment')
            //             }
            //         ]
            //     );
            // } else {
            //     Alert.alert(
            //         "Order Failed",
            //         "Something went wrong, please try again later.",
            //         [{ text: "OK" }]
            //     );
            // }
        });
    }
    const handleOpen = () => {
        refRBSheet.current.open();
    }
    const handleAddress = () => {
        navigation.navigate('Address')

    }

    const handleNavigation = () => {
        navigation.navigate("Products")
    }
    return (


        <>
            <Header
                title="Cart"
                left={-15}
            />
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1, backgroundColor: COLORS.white }}>

                    {cartItems && <Text style={{ fontSize: 20, color: COLORS.title, fontWeight: '800', marginHorizontal: 10 }}>Total Itmes: {cartItems.length}</Text>}
                    <Divider style={{ height: 2, backgroundColor: "grey" }} />
                    {
                        cartItems.length > 0 ?
                            <>

                                <FlatList
                                    data={cartItems}
                                    renderItem={({ item, index }) => {

                                        return (
                                            <CartComponent
                                                key={index}
                                                planType={item?.planType}
                                                perfer={item?.prefer}
                                                price={item?.price}
                                                id={item?.id}
                                                prName={item.name || item.planName}
                                                item={item}
                                                source={item.image}
                                            />
                                        )
                                    }} />

                                <TouchableOpacity
                                    onPress={handleOpen}
                                    style={{

                                        margin: 20,
                                        zIndex: 109, backgroundColor: COLORS.primary, borderRadius: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 5
                                    }}>

                                    <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "600" }}>Order</Text>
                                </TouchableOpacity>

                            </>
                            :
                            <View style={{ flex: 1, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require("../../assets/cart.png")} style={{ height: 300, resizeMode: 'contain' }} />
                                <TouchableOpacity
                                    onPress={() => handleNavigation()}
                                    style={{ borderRadius: 100, borderWidth: 1, borderColor: COLORS.secondry, paddingHorizontal: 50, paddingVertical: 10 }}>
                                    <Text style={{ fontSize: 18, color: COLORS.secondry, fontWeight: '700' }}>Add Items</Text>
                                </TouchableOpacity>
                            </View>
                    }



                </View>
                <RBSheet
                    ref={refRBSheet}
                    height={210}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'rgba(0,0,0,.6)',
                        },
                        draggableIcon: {
                            backgroundColor: '#000',
                        },
                    }}
                    customModalProps={{
                        animationType: 'slide',
                        statusBarTranslucent: true,
                    }}
                    customAvoidingViewProps={{
                        enabled: false,
                    }}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingHorizontal: 20, paddingVertical: 5 }}>
                            <Text style={{ color: COLORS.secondry, fontWeight: '700' }}>SELECT DELIVERY ADDRESS</Text>
                            <TouchableOpacity
                            // onPress={() => handleAddress()}
                            >
                                <Text style={{ color: COLORS.primary, fontWeight: '700' }}> + UPDATE ADDRESS</Text>
                            </TouchableOpacity>
                        </View>
                        <Divider style={{ backgroundColor: Column.Tertiary, height: 2 }} />


                        <>


                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require("../../assets/address.png")}
                                    style={{ height: 110, width: 140, resizeMode: 'contain' }}
                                />

                                <View style={{ paddingHorizontal: 20 }}>
                                    <Text style={{ color: COLORS.title, fontWeight: '700', fontSize: 20, }}>{name}</Text>

                                    <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.secondry }}>{address},{address2},{city}</Text>
                                    <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.secondry }}>{uState}---{zip}</Text>
                                    <Text style={{ fontSize: 16, color: COLORS.title, fontWeight: '500' }}>Mobile: {phone}</Text>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Button
                                    title="Delivery Here"
                                    onPress={handleOrder}
                                />
                            </View>
                        </>



                    </View>
                </RBSheet>
            </View>
        </>

    )
}

export default CartScreen

const styles = StyleSheet.create({})
