import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/theme'

const Header = () => {
    return (
        <View style={{ height: 100, backgroundColor: COLORS.primary, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30 }}>
            <View>

                <Text style={{ color: COLORS.lightGrey, fontSize: SIZES.h2, fontWeight: '500' }}>Welcome</Text>
                <Text style={{ color: COLORS.lightGrey, fontSize: SIZES.h4, fontWeight: '400' }}>Jon Doe</Text>
            </View>
            <View style={{ backgroundColor: COLORS.white, width: 20, height: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>

                <Text style={{ color: COLORS.title, fontWeight: '900' }}>i</Text>
            </View>
        </View>
    )
}

export default Header