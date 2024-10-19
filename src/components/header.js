import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES } from '../constants/theme';
import { Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ficon from 'react-native-vector-icons/FontAwesome6'
const Header = ({ title, pIcon, fIcon, left, cPress }) => {
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
                    <Text style={{ fontSize: SIZES.h1, color: COLORS.title, fontWeight: '700' }}>{title}</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity style={{ marginHorizontal: 20 }}>

                        <Ficon name={fIcon} size={30} color={COLORS.secondry} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cPress}>

                        <Icon source={pIcon} size={30} color={COLORS.secondry} />
                        {/* <View style={{ position: 'absolute', backgroundColor: COLORS.primary, height: 20, width: 20, right: -5, top: -5, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                            <Text style={{ color: COLORS.title, }}>1</Text>
                        </View> */}
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default Header;
