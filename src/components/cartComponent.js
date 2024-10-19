import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { removeCar } from '../../redux/Reducers/cartReducers'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../constants/theme'
import { removeCart } from '../redux/Reducers/cart.redux'

const CartComponent = ({ price, id, prName, source }) => {

    let dispatch = useDispatch()
    const handleRemove = (id) => {
        dispatch(removeCart(id))
    }
    const [count, setCount] = useState(1)

    const handleCounterDecrement = () => {

        if (count > 1) {
            setCount(prevCount => prevCount - 1) // Use functional update to ensure proper state update
        }
    }

    // Increment counter
    const handleCounterIncrement = () => {

        setCount(prevCount => prevCount + 1) // Use functional update to ensure proper state update
    }
    return (
        <>
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
                    <View style={{ marginHorizontal: 50, }}>

                        <Text style={{ color: COLORS.title, fontSize: 16, fontWeight: '600',marginBottom:10 }}>{prName}</Text>
                        <Text style={{ color: COLORS.title, fontSize: 20, fontWeight: '600' }}>{price * count}Rs/-</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 90 }}>

                            <View style={{ flexDirection: 'row', elevation: 5, alignItems: 'center',marginTop:10,  backgroundColor: COLORS.white, paddingHorizontal: 5, paddingVertical: 10, borderRadius: 100, width: 120, justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={handleCounterDecrement}

                                    style={{ backgroundColor: COLORS.secondry, width: 20, borderRadius: 100,justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, color: COLORS.white }}>-</Text>
                                </TouchableOpacity>
                                <Text style={{ width: 30, textAlign: 'center',fontSize:16,fontWeight:'900',color:COLORS.title }}>{count}</Text>
                                <TouchableOpacity
                                    onPress={handleCounterIncrement}
                                    style={{ backgroundColor: COLORS.secondry, width: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, color: COLORS.white }}>+</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                        <View style={{ marginTop: 10 }}>

                            <TouchableOpacity
                                onPress={() => handleRemove(id)}
                                style={{
                                    width: 120,
                                    zIndex: 99, borderRadius: 20, justifyContent: 'center', alignItems: 'center',
                                    borderColor: 'red',
                                    borderWidth: 1,
                                    paddingHorizontal: 5, paddingVertical: 5
                                }}>
                                <Text style={{ color: 'red', fontSize: 18, fontWeight: "600", }}>Cancel</Text>

                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
             


               



            </View>
        </>
    )
}

export default CartComponent

const styles = StyleSheet.create({})