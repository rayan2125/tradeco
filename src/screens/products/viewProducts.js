import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Alert } from 'react-native';
import RenderHTML from 'react-native-render-html'; // Import the library
import { Divider } from 'react-native-paper';
import { COLORS } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/header';
import Button from '../../components/button/button';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../redux/Reducers/cart.redux';
import { callAxiosGet } from '../../services/api';
import { API_CONSTANTS } from '../../constants/ApiCollection';

const ViewProducts = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(null);
    const cartItems = useSelector(state => state?.cart?.cartList);
    const coin = useSelector(state => state.auth.coin);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([route.params.image, ...(route.params.additional_images || [])]);

    useEffect(() => {
        handleProfile();
    }, []);

    const handleNextImage = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleCart = (item) => {
        const isGiftItemInCart = cartItems.some(cartItem => cartItem.type === "gift");
        const isProductInCart = cartItems.some(cartItem => cartItem.type === "product");

        if (item.type === "gift") {
            if (userInfo?.giftEligibility === 100) {
                if (isGiftItemInCart) {
                    Alert.alert("Notice", "Only one gift item can be added to the cart.");
                    return;
                }
                if (isProductInCart) {
                    Alert.alert("Notice", "You cannot add a gift item if there are already products in the cart.");
                    return;
                }
            } else {
                Alert.alert("Notice", "Please add more users to unlock this reward.");
                return;
            }
        } else if (item.type === "product") {
            if (isGiftItemInCart) {
                Alert.alert("Notice", "You cannot add products if there is already a gift item in the cart.");
                return;
            }
            
        }

        dispatch(addCart({ ...item, quantity: 1 }));
        navigation.navigate("Cart");
    };

    const handleProfile = async () => {
        const response = await callAxiosGet(API_CONSTANTS.info);
        setUserInfo(response.data);
    };

    const { height, width } = Dimensions.get("window");

    return (
        <>
            <Header
                title="Products"
                source={require('../../assets/coin.png')}
                coins={coin}
                left={35}
            />
            <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                <View style={{ flex: 1, margin: 20 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Text style={{ fontSize: 24, fontWeight: '600', color: COLORS.title }}>{route.params.name}</Text>
                            <View style={{ alignItems: 'center', marginTop: 20, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={handlePrevImage} disabled={currentIndex === 0} style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}>
                                    <Text style={{ fontSize: 30, color: COLORS.primary }}>{'<'}</Text>
                                </TouchableOpacity>

                                <Image
                                    source={{ uri: images[currentIndex] }}
                                    style={{
                                        height: height > 700 ? 400 : 200,
                                        width: 300,
                                        resizeMode: 'contain',
                                        borderRadius: 20,
                                        marginHorizontal: 10,
                                    }}
                                />

                                <TouchableOpacity onPress={handleNextImage} disabled={currentIndex === images.length - 1} style={{ opacity: currentIndex === images.length - 1 ? 0.3 : 1 }}>
                                    <Text style={{ fontSize: 30, color: COLORS.primary }}>{'>'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Divider style={{ height: 1 }} />
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ color: COLORS.title }}>
                                {'\u20B9'}
                                <Text style={{ fontSize: 22, color: COLORS.title, fontWeight: '500', marginHorizontal: 10, textDecorationLine: route.params.type === "gift" ? 'line-through' : 'none' }}>
                                    {route.params.price}
                                </Text>
                                {route.params.type === "gift" && <Text style={{ fontSize: 28, color: COLORS.title, fontWeight: '500' }}>  0</Text>}
                            </Text>
                        </View>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <Text style={{ color: COLORS.title, fontSize: 18, fontWeight: '700' }}>Description:</Text>
                            {/* Render HTML description */}
                            <RenderHTML
                                contentWidth={width}
                                source={{ html: route.params.description }}
                            />
                        </View>
                    </ScrollView>
                    <Button title="Add Cart" onPress={() => handleCart(route.params)} />
                </View>
            </View>
        </>
    );
};

export default ViewProducts;
