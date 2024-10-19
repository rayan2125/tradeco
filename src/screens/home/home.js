import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../../components/header'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Circle } from 'react-native-svg'
import { COLORS } from '../../constants/theme'
import { Image } from 'react-native'
import { Icon } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { NativeModules } from 'react-native'
const Home = () => {
    let userDetails = useSelector(state => state.auth.adduser)
    let navigation = useNavigation()
    const {GooglePay} = NativeModules;
    
    const data = [
        {
            id: 1,
            title: "MY ",
            tis: 'TEAM',
            icn: 'account-group'
        },
        {
            id: 2,
            title: "BUY",
            tis: 'PRODUCTS',
            icn: 'cart-variant'
        },
        // {
        //     id: 3,
        //     title: "ADD",
        //     tis: 'MEMBER',
        //     icn: 'account-plus'
        // },



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


            <View style={{ backgroundColor: COLORS.white, flex: 1, justifyContent: 'space-around' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 30 }}>


                    <AnimatedCircularProgress
                        size={160}
                        width={30}
                        fill={50}
                        tintColor={COLORS.primary}
                        backgroundColor="#BABABB"
                        padding={10}
                        lineCap='round'
                    >{(fill) => (<Text style={{ color: 'black', fontSize: 18, fontWeight: '800' }}>50%</Text>)}</AnimatedCircularProgress>




                </View>
                <View style={{ margin: 10, height: '55%', backgroundColor: '#ececec', marginTop: 10, borderRadius: 20 }}>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -30, margin: 20 }}>

                        <View style={{ backgroundColor: COLORS.primary, width: '30%', paddingVertical: 15, elevation: 20, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 17, }}>

                            <Text style={{ color: COLORS.white, fontSize: 20 }}>Active</Text>

                        </View>
                        <View style={{ backgroundColor: '#FAAE4D', width: '30%', paddingVertical: 15, elevation: 20, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 17, }}>
                            <Text style={{ color: COLORS.white, fontSize: 20 }}>Pending</Text>

                        </View>

                        <View style={{ backgroundColor: 'grey', width: '30%', paddingVertical: 15, elevation: 20, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 17, }}>

                            <Text style={{ color: COLORS.white, fontSize: 20 }}>Total</Text>

                        </View>
                    </View>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: -20, margin: 20 }}>

                        <View style={{ alignSelf: 'center' }}>

                            <Text style={{ color: COLORS.primary, fontSize: 38, }}>{userDetails.childCount.active}</Text>

                        </View>
                        <View style={{ alignSelf: 'center' }}>

                            <Text style={{ color: '#FAAE4D', fontSize: 38 }}>{userDetails.childCount.pending}</Text>

                        </View>

                        <View style={{ alignSelf: 'center' }}>

                            <Text style={{ color: 'grey', fontSize: 38 }}>{userDetails.childCount.total}</Text>

                        </View>
                    </View> */}
                    <View style={{ alignItems: 'center', }}>
                        <FlatList
                            data={data}
                            numColumns={3}
                            // horizontal
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                            bounces={false}
                            renderItem={({ item, index }) => {
                                return (


                                    <TouchableOpacity
                                        onPress={() => handleNavigation(item)}
                                        style={{
                                            // margin:1,
                                            marginHorizontal: 5,
                                            height: 160, width: '47.2%', borderRadius: 20,
                                            paddingHorizontal: 22,
                                            paddingVertical: 20,
                                            elevation: 5, alignItems: 'center',
                                            backgroundColor: 'white',
                                            marginVertical: 10,
                                            zIndex: 100
                                        }}>
                                        <Icon source={item.icn} size={60} color={COLORS.primary} />
                                        {/* <View style={{ height: 50, width: 50, borderRadius: 100, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>

                                        </View> */}
                                        <Text style={{ fontSize: 18, marginTop: 5, textAlign: 'center', fontWeight: '600', color: COLORS.title, }}>{item.title}</Text>
                                        <Text style={{ fontSize: 18, marginTop: 2, width: 140, fontWeight: '600', color: COLORS.title, textAlign: 'center', }}>{item.tis}</Text>
                                    </TouchableOpacity>

                                )
                            }} />

                    </View>
                    <TouchableOpacity onPress={() => handleNavigation(id = 3)} style={{ elevation: 10, marginTop: 10, borderRadius: 10, margin: 7, backgroundColor: 'white', height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: COLORS.primary }}>Add Member</Text>
                    </TouchableOpacity>

                    <View>
                    </View>
                </View>
            </View>
            <View style={{ height: '10%', backgroundColor: COLORS.white }}></View>
        </>
    )
}

export default Home

const styles = StyleSheet.create({})