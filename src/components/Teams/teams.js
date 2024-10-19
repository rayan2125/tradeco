import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider, Icon } from 'react-native-paper'
import { COLORS } from '../../constants/theme'

const TeamsComponent = ({ item }) => {
    return (
        <>
            <View key={item.id} style={{ margin: 5, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 }}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5 }}>
                    <Icon source="account-multiple" size={25} color={COLORS.title} />
                    <Text style={{ color: COLORS.title, fontSize: 18, fontWeight: '700', marginHorizontal: 18, }}>{item.parent}</Text>
                </View>
                {/* <Divider style={{ height: 1, backgroundColor: COLORS.title }} /> */}
                <View style={{ flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5 }}>
                    <Icon source="email" size={20} color={COLORS.title} />
                    <Text style={{ color: COLORS.title, fontSize: 16, fontWeight: '700', marginHorizontal: 18 }}>{item.email}</Text>
                </View>
                {/* <Divider style={{ height: 1, backgroundColor: COLORS.title }} /> */}
                <View style={{ flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5 }}>
                    <Icon source="cellphone" size={20} color={COLORS.title} />
                    <Text style={{ color: COLORS.title, fontSize: 16, fontWeight: '700', marginHorizontal: 18 }}>{item.phone}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5 }}>
                    <Icon source="account" size={20} color={COLORS.title} />
                    <Text style={{ color: COLORS.title, fontSize: 16, fontWeight: '700', marginHorizontal: 18 }}>{item.name}</Text>
                </View>

                {/* <Text style={{ color: COLORS.title, fontSize: 14, fontWeight: '700', marginHorizontal: 18 }}>{item.name}</Text> */}
                <View style={{ position: 'absolute', flexDirection: 'row', top: 0, alignItems: 'center', right: 10, paddingHorizontal: 5, paddingVertical: 5, borderTopRightRadius: 20 }}>
                    <View style={{ height: 10, backgroundColor: item.status === "active" ? 'green' : COLORS.yellow, borderRadius: 100, width: 10, marginHorizontal: 5, top: 3 }}></View>
                    <Text style={{ color: item.status === "active" ? 'green' : COLORS.yellow }}>{item.status}</Text>
                </View>
                {/* <Divider style={{ height: 1, backgroundColor: COLORS.title }} /> */}
            </View>
            <Divider style={{ height: 1, backgroundColor: COLORS.title }} />
        </>
    )
}

export default TeamsComponent

const styles = StyleSheet.create({})