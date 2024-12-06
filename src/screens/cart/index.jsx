import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Alert, Modal, Switch } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Divider, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';

import { COLORS } from '../../constants/theme';
import Button from '../../components/button/button';
import Header from '../../components/header';
import { API_CONSTANTS } from '../../constants/ApiCollection';
import { removeAllCart } from '../../redux/Reducers/cart.redux';
import CartComponent from '../../components/cartComponent';
import { callAxios, callAxiosGet } from '../../services/api';

const CartScreen = () => {

    const cartItems = useSelector(state => state?.cart?.cartList);



    useEffect(() => {
        handleProfile()
    }, [])
    const [userInfo, setUserInfo] = useState('')
    const [checked, setChecked] = React.useState('');
    const [openModal, setOpenModal] = useState(false)
    let coin = useSelector(state => state.auth.coin)

    const refRBSheet = useRef();
    const navigation = useNavigation();
    const handleProfile = async () => {
        await callAxiosGet(API_CONSTANTS.profile).then((res) => {
            setUserInfo(res.data)
        })
    }
    const { phone, name, email, city, address, address2, state, zip } = userInfo;



    const handlePayment = async () => {
        refRBSheet.current.close();
        setOpenModal(true);

        const orderItems = cartItems.map(({ id, quantity, price, name,type }) => ({
            product_id: id,
            quantity,
            price:type === "gift" ? 0 : Number(price),
            name,
            type
        }));
       
        const totalAmount = cartItems.reduce((total, item) => {
            const price = parseFloat(item.price || 0); // Ensure price is a valid number
            const quantity = parseInt(item.quantity || 0, 10); // Ensure quantity is a valid integer
            return total + price * quantity;
        }, 0);
        
       
        

        const req = {
            name,
            email,
            phone,
            city,
            address,
            address2,
            state,
            zip,
            products: orderItems,
            totalAmount,


        };

        navigation.navigate("OrderPayment", req);
    };


    const handleOpen = () => refRBSheet.current.open();
    const handleNavigation = () => navigation.navigate("Products");

    return (
        <>
            <Header title="Cart"
                left={35}
                source={require('../../assets/coin.png')}
                coins={coin}

            />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                    {cartItems && (
                        <Text style={{ fontSize: 20, color: COLORS.title, fontWeight: '800', marginHorizontal: 10 }}>
                            Total Items: {cartItems.length}
                        </Text>
                    )}
                    <Divider style={{ height: 2, backgroundColor: "grey" }} />
                    {cartItems.length > 0 ? (
                        <>
                            <FlatList
                                data={cartItems}
                                renderItem={({ item, index }) => (

                                    <CartComponent
                                        key={index}
                                        price={item.price}
                                        id={item.id}
                                        prName={item.name}
                                        item={item.item}
                                        source={item.image}
                                        type={item.type}
                                        quantity={item.quantity} // Pass the quantity here
                                    />
                                )}
                            />
                            <TouchableOpacity onPress={handleOpen} style={styles.orderButton}>
                                <Text style={styles.orderButtonText}>Order</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <View style={styles.emptyCartContainer}>
                            <Image source={require("../../assets/cart.png")} style={styles.cartImage} />
                            <TouchableOpacity onPress={handleNavigation} style={styles.addItemsButton}>
                                <Text style={styles.addItemsText}>Add Items</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <RBSheet ref={refRBSheet} height={250} customStyles={styles.rbSheetCustomStyles}>
                    <View>
                        <View style={styles.addressHeader}>
                            <Text style={{ color: COLORS.secondry, fontWeight: '700' }}>SELECT DELIVERY ADDRESS</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                                <Text style={{ color: COLORS.primary, fontWeight: '700' }}> + UPDATE ADDRESS</Text>
                            </TouchableOpacity>
                        </View>
                        <Divider style={{ backgroundColor: COLORS.tertiary, height: 2 }} />
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require("../../assets/address.png")} style={styles.addressImage} />
                            <View style={{ paddingHorizontal: 20 }}>
                                <Text style={styles.nameText}>{name}</Text>
                                <Text style={styles.addressText}>{address} | {address2}</Text>
                                <Text style={styles.addressText}>{city} | {state} |</Text>
                                <Text style={styles.addressText}>| {zip}</Text>
                                <Text style={styles.phoneText}>Mobile: {phone}</Text>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 20 }}>
                            <Button title="Delivery Here" onPress={handlePayment} />
                        </View>
                    </View>
                </RBSheet>
            </View>




        </>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    orderButton: {
        margin: 20,
        zIndex: 109,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    orderButtonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: "600"
    },
    emptyCartContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cartImage: {
        height: 300,
        resizeMode: 'contain'
    },
    addItemsButton: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: COLORS.secondry,
        paddingHorizontal: 50,
        paddingVertical: 10
    },
    addItemsText: {
        fontSize: 18,
        color: COLORS.secondry,
        fontWeight: '700'
    },
    rbSheetCustomStyles: {
        wrapper: { backgroundColor: 'rgba(0,0,0,.6)' },
        draggableIcon: { backgroundColor: '#000' }
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    addressImage: {
        height: 110,
        width: 140,
        resizeMode: 'contain'
    },
    nameText: {
        color: COLORS.title,
        fontWeight: '700',
        fontSize: 20
    },
    addressText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.secondry,
        width: '80%'
    },
    phoneText: {
        fontSize: 16,
        color: COLORS.title,
        fontWeight: '500'
    }
});

