import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../../components/header'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Circle } from 'react-native-svg'
import { COLORS } from '../../constants/theme'
import { Image } from 'react-native'
import { Icon } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
const Home = () => {
    let navigation = useNavigation()
    const data = [
        {
            id: 1,
            title: "MY TEAM",
            icn: 'microsoft-teams'
        },
        {
            id: 2,
            title: "BUY PRODUCTS",
            icn: 'cart-variant'
        },
        {
            id: 3,
            title: "ADD NEW MEMBER",
            icn: 'account-supervisor'
        },
        


    ]
    const handleNavigation = (item) => {
        if (item.id === 1) {
            navigation.navigate("Teams")
        } else if (item.id === 2) {
            navigation.navigate('Products')
        } else {

            navigation.navigate('AddMember')
        }
    }
    return (
        <>


            <View style={{ backgroundColor: COLORS.white, flex: 1, }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ height: 180, width: 180, borderRadius: 100, backgroundColor:'rgba(0,0,0,.5)'}}>

                        <AnimatedCircularProgress
                            size={170}
                            width={15}
                            fill={50}
                            tintColor={COLORS.primary}
                            backgroundColor='rgb(204,204,245)'
                            padding={10}


                            renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="blue" />}
                        >{(fill) => (<Text>50%</Text>)}</AnimatedCircularProgress>

                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'rgb(242,242,212)', marginTop: 10, borderTopRightRadius: 40, borderTopLeftRadius: 40, }}>
                    <View style={{ flex: 1, margin: 20 }}>
                        <Text style={{ color: COLORS.title, fontSize: 18, textAlign: 'center' }}>All Member Status</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, margin: 20 }}>

                            <View style={{ backgroundColor: COLORS.primary, width: '30%', paddingVertical: 10, elevation: 20, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
                                <Text style={{ color: COLORS.white }}>Active</Text>
                                <Text>00</Text>
                            </View>
                            <View style={{ backgroundColor: COLORS.yellow, width: '30%', paddingVertical: 10, elevation: 20, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
                                <Text style={{ color: COLORS.white }}>Pending</Text>
                                <Text>00</Text>
                            </View>
                            <View style={{ backgroundColor: COLORS.secondry, width: '30%', paddingVertical: 10, elevation: 20, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
                              
                                <Text style={{ color: COLORS.white }}>Total</Text>
                            <Text>00</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', flex: 1, }}>
                            <FlatList
                                data={data}
                                // numColumns={2}
                                horizontal
                                showsVerticalScrollIndicator={false}
                                scrollEnabled ={false}
                                renderItem={({ item, index }) => {
                                    return (


                                        <TouchableOpacity
                                            onPress={() => handleNavigation(item)}
                                            style={{
                                                marginHorizontal: 5,
                                                height: 120, width: 100, borderRadius: 20,
                                                paddingHorizontal: 20,
                                                paddingVertical: 20,
                                                elevation: 5, alignItems: 'center',
                                                backgroundColor: 'white',
                                                marginVertical: 10,
                                                zIndex: 100
                                            }}>
                                            <View style={{ height: 50, width: 50, borderRadius: 100, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
                                                <Icon source={item.icn} size={30} color='white' />

                                            </View>
                                            <Text style={{ fontSize: 10, marginTop: 5, textAlign: 'center', fontWeight: '600', color: COLORS.secondry }}>{item.title}</Text>
                                        </TouchableOpacity>

                                    )
                                }} />
                            
                        </View>

                    </View>
                    <View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Home

const styles = StyleSheet.create({})