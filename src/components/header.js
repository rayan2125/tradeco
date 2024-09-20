import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES } from '../constants/theme';
import { Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    let navigation = useNavigation()
    const [open, setOpen] = useState(false);


    return (
        <>
            <View style={{ height: 70, backgroundColor: COLORS.white, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    style={{ backgroundColor:'rgb(101,101,101)', height: 40, width: 40, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon source="less-than" color={COLORS.white} />
                </TouchableOpacity>

                {/* Centered View */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', right: 15 }}>
                    <Text style={{ fontSize: SIZES.h2, color: COLORS.black }}>Product</Text>
                </View>
            </View>
        </>
    );
};

export default Header;
