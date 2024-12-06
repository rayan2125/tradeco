import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { removeCar } from '../../redux/Reducers/cartReducers'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../constants/theme'
import { removeCart, updateCartQuantity } from '../redux/Reducers/cart.redux'

const CartComponent = ({ price, id, prName, source, item, type, quantity }) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(quantity);


    const handleCounterIncrement = () => {
        if (type !== "gift") {
            const newCount = count + 1;
            setCount(newCount);
            dispatch(updateCartQuantity({ id, quantity: newCount }));
        }
    };

    const handleCounterDecrement = () => {
        if (type !== "gift" && count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            dispatch(updateCartQuantity({ id, quantity: newCount }));
        }
    };


    const handleRemove = () => {
        dispatch(removeCart(id));
    };

    const displayPrice = type === "gift" ? "Gift Item" : `₹${price * count}`;


    return (
        <View style={{
            elevation: 5,
            zIndex: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            backgroundColor: COLORS.white,
            borderRadius: 15,
            paddingHorizontal: 20,
            paddingVertical: 20,
            marginTop: 10
        }}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={{ uri: source }}
                    style={{ height: 160, width: 100, resizeMode: 'contain' }}
                />
                <View style={{ marginHorizontal: 50 }}>
                    <Text style={{ color: COLORS.title, fontSize: 16, fontWeight: '600', marginBottom: 10, width: 170 }}>{prName}</Text>

                    {/* Display price conditionally */}
                    {type === "gift"
                        ? <Text style={{ color: COLORS.title, fontSize: 20, fontWeight: '600' }}>Gift Item</Text>
                        : <Text style={{ color: COLORS.title, fontSize: 20, fontWeight: '600' }}>{'\u20B9'}{price * quantity}</Text>
                    }

                    {type !== "gift" && (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 90 }}>
                            <View style={{ flexDirection: 'row', elevation: 5, alignItems: 'center', marginTop: 10, backgroundColor: COLORS.white, paddingHorizontal: 5, paddingVertical: 10, borderRadius: 100, width: 120, justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={handleCounterDecrement}
                                    style={{ backgroundColor: COLORS.secondry, width: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, color: COLORS.white }}>-</Text>
                                </TouchableOpacity>
                                <Text style={{ width: 30, textAlign: 'center', fontSize: 16, fontWeight: '900', color: COLORS.title }}>{quantity}</Text>
                                <TouchableOpacity
                                    onPress={handleCounterIncrement}
                                    style={{ backgroundColor: COLORS.secondry, width: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, color: COLORS.white }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={() => handleRemove(id)}
                            style={{
                                width: 120,
                                zIndex: 99,
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: 'red',
                                borderWidth: 1,
                                paddingHorizontal: 5,
                                paddingVertical: 5
                            }}>
                            <Text style={{ color: 'red', fontSize: 18, fontWeight: "600" }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CartComponent




const styles = StyleSheet.create({})