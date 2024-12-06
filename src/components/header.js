import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES } from '../constants/theme';
import { Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ficon from 'react-native-vector-icons/FontAwesome6'
import { useSelector } from 'react-redux';
const Header = ({ title, pIcon, fIcon, left, cPress, source, coins,handleSerch }) => {
    const cartItems = useSelector(state => state?.cart?.cartList);

    let navigation = useNavigation()
    const [open, setOpen] = useState(false);


    return (
        <>
            <View style={{ height: 70, backgroundColor: COLORS.white, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    style={{ backgroundColor: COLORS.secondry, height: 40, width: 40, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon source="less-than" color={COLORS.white} />
                </TouchableOpacity>

                {/* Centered View */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', left: left }}>
                    <Text style={{ fontSize: SIZES.h1, color: COLORS.secondry, fontWeight: '700' }}>{title}</Text>
                </View>

                {
                    fIcon ?
                        <View style={{ flexDirection: 'row', }}>

                            <TouchableOpacity 
                            onPress={handleSerch}
                            style={{ marginHorizontal: 20 }}>

                                <Ficon name={fIcon} size={30} color={COLORS.secondry} />
                            </TouchableOpacity>
                            <View>
                                {
                                    cartItems.length > 0 ?
                                        <View style={{ position: 'absolute', top: -8, left: 20, backgroundColor: '#625D57', height: 18, width: 18, zIndex: 100, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: COLORS.white, fontSize: 10 }}>{cartItems.length}</Text>
                                        </View> : []
                                }
                                <TouchableOpacity onPress={cPress}>

                                    <Icon source={pIcon} size={30} color={COLORS.secondry} />
                                </TouchableOpacity>
                            </View>

                        </View> :

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Image source={source} style={{ height: 50, width: 50, resizeMode: 'contain' }} />
                            <Text style={{ fontSize: 18, color: COLORS.title, fontWeight: '600' }}>{coins}</Text>
                        </View>
                }
            </View>
        </>
    );
};

export default Header;
