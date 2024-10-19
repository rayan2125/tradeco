import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-paper'
import { COLORS } from '../../constants/theme'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/header'
import Button from '../../components/button/button'

const ViewProducts = ({ route }) => {
    let navigation = useNavigation()
    const [selected, setselected] = useState(false)
    let img = route.params.image
    let des = route.params.description
    let price = route.params.price
    let name = route.params.name

    const handleNavigation = () => {
        navigation.navigate("Cart")
    }

    return (
        <>
            <Header title="Products " />
            <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                <View style={{ flex: 1, margin: 20 }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 24, fontWeight: '600', color: COLORS.title }}>{name}</Text>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            {/* Centered Image */}
                            <Image source={{ uri: img }} style={{ height: 400, width: 300, resizeMode: 'contain', borderRadius: 20 }} />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ color: COLORS.title }}>
                            Rs
                            <Text style={{ fontSize: 24, color: COLORS.title, fontWeight: '500', marginHorizontal: 10 }}> {price} {'\u20B9'}</Text>
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity onPress={() => setselected(!selected)}>
                                <Icon source={selected === true ? "heart" : "cards-heart-outline"} size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setselected(!selected)}>
                                <Icon source="share-variant-outline" size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ marginTop: 10, gap: 15 }}>
                                <Text>{des}</Text>
                            </View>
                        </ScrollView>
                        <Button title="Add Cart" onPress={handleNavigation} />
                    </View>
                </View>
            </View>
        </>
    )
}

export default ViewProducts
