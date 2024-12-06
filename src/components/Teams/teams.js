import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Divider, Icon } from 'react-native-paper'
import { COLORS } from '../../constants/theme'
import { useNavigation } from '@react-navigation/native'

const TeamsComponent = ({ item }) => {
    let navigation = useNavigation()
    const handleNavigation = (item) => {
        navigation.push("TeamsMember", item)
    }
    return (
        <>
            <TouchableOpacity
                onPress={() => handleNavigation(item)}
                key={item.id} style={{ margin: 5, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 15,backgroundColor:COLORS.white,elevation:10 }}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5 }}>
                    <View style={{ height: 30, width: 30, backgroundColor:'orange', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon source="account-child" size={25} color={COLORS.white} />


                    </View>
                    <Text style={{ color:'#001919', fontSize: 18, fontWeight: '700', marginHorizontal: 18, }}>{item.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5 }}>
                    <View style={{ height: 30, width: 30, backgroundColor: 'green', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>

                        <Icon source="cellphone-dock" size={20} color={COLORS.white} />
                    </View>
                    <Text style={{ color:'#001919', fontSize: 16, fontWeight: '700', marginHorizontal: 18 }}>{item.phone}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5 }}>
                    <View style={{ height: 30, width: 30, backgroundColor: '#006EB8', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>



                        <Icon source="account" size={20} color={COLORS.white} />
                    </View>
                    <Text style={{ color:'#001919', fontSize: 16, fontWeight: '700', marginHorizontal: 18 }}>{item.parent}</Text>
                </View>
                <Divider style={{ height: 2, backgroundColor:'grey' }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', zIndex: 100, marginTop: 10 }}>

                    
                        <Text style={{ color: COLORS.primary, fontSize: 14 }}>Active</Text>
                    
                        <Text style={{ color:'#FAAE4D', fontSize: 14 }}>Pending</Text>

                    
                        <Text style={{ color:'grey', fontSize: 14 }}>Total</Text>
                </View>
                {item &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', zIndex: 100, marginTop: 10 }}>

                    
                <Text style={{ color: COLORS.primary, fontSize: 14 }}>{item.childCount.active
                            }</Text>
            
                <Text style={{ color:'#FAAE4D', fontSize: 14 }}>{item.childCount.pending
                            }</Text>

            
                <Text style={{ color:'grey', fontSize: 14 }}>{item.childCount.total
                            }</Text>
        </View>
                    }


                {/* <Text style={{ color: COLORS.title, fontSize: 14, fontWeight: '700', marginHorizontal: 18 }}>{item.name}</Text> */}
                <View style={{ position: 'absolute', flexDirection: 'row', top: 0, alignItems: 'center', right: 10, paddingHorizontal: 5, paddingVertical: 5, borderTopRightRadius: 20 }}>
                    <View style={{ height: 10, backgroundColor:item.status === "active" ? 'green' : item.status==="pending"? COLORS.yellow :'red', borderRadius: 100, width: 10, marginHorizontal: 5, top: 3 }}></View>
                    <Text style={{ color: item.status === "active" ? 'green' : item.status==="pending"? COLORS.yellow :'red'}}>{item.status}</Text>
                </View>
                {/* <Divider style={{ height: 1, backgroundColor: COLORS.title }} /> */}
            </TouchableOpacity>
            {/* <Divider style={{ height: 1, backgroundColor: COLORS.title }} /> */}
        </>
    )
}

export default TeamsComponent

const styles = StyleSheet.create({})