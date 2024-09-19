import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-paper'
import { COLORS } from '../../constants/theme'
import { useNavigation } from '@react-navigation/native'
import Rating from '../../components/rating'

const ViewProducts = ({ route }) => {
    let navigation = useNavigation()
    const [selected, setselected] = useState(false)
    let img = route.params.image
    let des = route.params.description
    let price = route.params.price
    let name = route.params.name
    // console.log(img)
    const handleNavigation = () => {
        navigation.navigate("Cart")
    }
    return (
        <View style={{ margin: 20, flex: 1 }} >
            <TouchableOpacity
                onPress={() => navigation.pop()}
                style={{ backgroundColor: COLORS.primary, height: 40, width: 40, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                <Icon source="less-than" color={COLORS.white} />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ marginTop: 20 }}>
                        <Image source={{ uri: img }} style={{ height: 200, resizeMode: 'contain', borderRadius: 20 }} />
                    </View>
                    <View style={{ marginTop: 10, gap: 15 }}>
                        <View>

                            <Text style={{ fontSize: 18, textAlign: 'center' }}> Product Name:{name}</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text>
                                Rs
                                <Text style={{ fontSize: 22, color: COLORS.primary, fontWeight: '500', marginHorizontal: 10 }}>  {price}/-</Text>
                            </Text>
                            <View style={{ flexDirection: 'row', gap: 10 }}>

                                <TouchableOpacity
                                    onPress={() => setselected(!selected)}
                                >
                                    <Icon source={selected === true ? "heart" : "cards-heart-outline"} size={25} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                // onPress={() => setselected(!selected)}
                                >
                                    <Icon source="share-variant-outline" size={25} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Rating count={5} />
                        </View>
                        <Text>{des.slice(0, 500)}</Text>
                    </View>
                    <View>

                        <TouchableOpacity
                            onPress={() => handleNavigation()}
                            style={{ backgroundColor: COLORS.primary, borderRadius: 30, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 14, color: COLORS.white, fontWeight: '600' }}>Add Cart</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default ViewProducts