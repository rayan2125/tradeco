import React from "react";
import { View, Text, TextInput, ScrollView, FlatList, TouchableOpacity, Image } from "react-native";
import styles from './styles';

import { COLORS } from '../../constants/theme';
import Restaurent from "../../components/restaurent";
import DATA from "../../data/data.json";
import Header from "../../components/header";
import Button from "../../components/button/button";
import SettingCard from "../../components/card/settingCard";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-paper";
import * as Progress from 'react-native-progress';

const HomeScreen = ({ }) => {
    const navigation = useNavigation()
    // filter by price type
    const data = [
        {
            id: 1,
            title: "MY TEAM",
            img: require("../../assets/team.png")
        },
        {
            id: 2,
            title: "BUY PRODUCTS",
            img: require("../../assets/product.png")
        },
        {
            id: 3,
            title: "ADD NEW MEMBER",
            img: require("../../assets/member.png")
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
            {/* <Header /> */}
            <View style={{ alignSelf: 'flex-end', right: 20, margin: 5 }}>



            </View>
            <View style={{ backgroundColor: COLORS.primary, paddingHorizontal: 10, paddingVertical: 20,borderBottomLeftRadius:30,borderBottomRightRadius:30 }}>
                <TouchableOpacity style={{ marginBottom: 10, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', backgroundColor: COLORS.white, elevation: 5, paddingHorizontal: 5, paddingVertical: 5, borderRadius: 30 }}>
                    <Icon source="gift" size={25} color={COLORS.yellow} />
                    <Text style={{ marginHorizontal: 10, fontSize: 14, color: COLORS.secondry, fontWeight: '400' }}>Reward</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', }}>

                    <FlatList
                        data={data}
                        horizontal

                        renderItem={({ item, index }) => {
                            return (


                                <TouchableOpacity
                                    onPress={() => handleNavigation(item)}
                                    style={{
                                        marginHorizontal: 5,
                                        height: 150, width: 105, backgroundColor: COLORS.white, borderRadius: 20,
                                        paddingHorizontal: 20,
                                        paddingVertical: 20,
                                        elevation: 5, alignItems: 'center'
                                    }}>
                                    <View style={{ height: 90, width: 90, borderRadius: 100, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>

                                        <Image source={item.img} style={{ height: 50, width: 50, resizeMode: 'contain' }} />
                                    </View>
                                    <Text style={{ fontSize: 10, marginTop: 5, textAlign: 'center', fontWeight: '600', color: COLORS.secondry }}>{item.title}</Text>
                                </TouchableOpacity>

                            )
                        }} />
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'rgb(242,242,242)' }}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                    <View style={{ margin: 20, }}>


                        <View style={{ alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
                            {/* <View style={{ marginTop: 20 }}>

                                <Text style={{ color: COLORS.secondry, fontSize: 14, fontWeight: '600' }}>
                                    Claim your gift
                                </Text>
                                <View style={{ alignSelf: 'center' }}>
                                    <View>
                                    </View>
                                    <View style={{ height: 100, width: 100, borderRadius: 100, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, fontWeight: '400', color: COLORS.white }}>CLAIM</Text>
                                    </View>
                                </View>
                            </View> */}
                            <Text style={{ color: COLORS.secondry, fontSize: 14, fontWeight: '600', marginHorizontal: -90 }}>
                                Claim your gift
                            </Text>
                            <TouchableOpacity style={{ borderColor: COLORS.primary, borderWidth: 5, borderRadius: 100, width: 150, }}>

                                <Progress.Pie progress={.6} size={140} color={COLORS.primary} te />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            {/* <Text style={{ color: COLORS.secondry, fontSize: 16, fontWeight: '500' }}>Members Counts</Text> */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                <View style={{ backgroundColor: 'green', width: '30%', paddingHorizontal: 15, paddingVertical: 15, elevation: 5, borderRadius: 20, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.white }}>Active</Text>
                                    <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 15, paddingVertical: 15, elevation: 5, borderRadius: 100, alignItems: 'center' }}>
                                        <Text>20</Text>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: 'red', width: '30%', paddingHorizontal: 15, paddingVertical: 15, elevation: 5, borderRadius: 20, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.white }}>Pending</Text>
                                    <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 15, paddingVertical: 15, elevation: 5, borderRadius: 100, alignItems: 'center' }}>
                                        <Text>20</Text>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: COLORS.secondry, width: '30%', paddingHorizontal: 15, paddingVertical: 15, elevation: 5, borderRadius: 20, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.white }}>Total</Text>
                                    <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 15, paddingVertical: 15, elevation: 5, borderRadius: 100, alignItems: 'center' }}>
                                        <Text>20</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <View style={{ width: '45%', height: 150, backgroundColor: COLORS.primary, paddingHorizontal: 30, paddingVertical: 15, elevation: 5, borderRadius: 20, alignItems: 'center' }}>
                                 <View style={{ backgroundColor: COLORS.white, height:80,width:80, elevation: 10, borderRadius: 100, alignItems: 'center',justifyContent:'center',right:10 }}>
                                    <Text style={{ color: COLORS.title, fontWeight: '600', fontSize: 20 }}>20</Text>
                                </View>
                                <Text style={{ textAlign: 'center', fontSize: 16, color: COLORS.title, fontWeight: '600', marginTop: 10, marginBottom: 10 }}>Child Count</Text>
                            </View>
                            <View style={{ width: '45%', height: 150, backgroundColor: COLORS.primary, paddingHorizontal: 30, paddingVertical: 15, elevation: 5, borderRadius: 20, alignItems: 'center' }}>
                                <View style={{ backgroundColor: COLORS.white, height:80,width:80, elevation: 10, borderRadius: 100, alignItems: 'center',justifyContent:'center',right:10 }}>
                                    <Text style={{ color: COLORS.secondry, fontWeight: '600', fontSize: 20 }}>20</Text>
                                </View>
                                <Text style={{ textAlign: 'center', fontSize: 16, color: COLORS.title, fontWeight: '600', marginTop: 10, marginBottom: 10 }}>Reward Points</Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default HomeScreen;
