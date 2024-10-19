import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from './styles';
import { COLORS } from "../../constants/theme";
import { Divider, Icon } from "react-native-paper";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { callAxiosGet } from "../../services/api";
import { API_CONSTANTS } from "../../constants/ApiCollection";
import { useSelector } from "react-redux";
// import icom from 'react-native-vector-icons/ic'
const AccountScreen = () => {

    let userDetails = useSelector(state => state.auth.adduser)
    let navigation = useNavigation()


    const handleNavigation = () => {
        navigation.navigate('Profile', userDetails)
    }
    return (
        <>
            <View style={[styles.container, { marginTop: 10 }]}>
                <ScrollView>
                    <View>
                        <View style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 10, borderColor: COLORS.primary, borderWidth: 1, borderRadius: 100, height: 160, width: 160, justifyContent: 'center', alignItems: 'center' }}>

                            <Image source={require("../../assets/boy1.jpeg")} style={{ height: 150, width: 150, borderRadius: 100, resizeMode: 'cover' }} />
                        </View>
                        <View style={{}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                <Text style={{ fontSize: 20, fontWeight: '500', color: COLORS.title, marginHorizontal: 20, marginBottom: 10 }}> Hey! {userDetails.name}</Text>
                                <TouchableOpacity
                                    onPress={() => handleNavigation()}
                                    style={{ marginHorizontal: 10 }}>
                                    <Icon source='pencil-outline' size={25} color={COLORS.title} />
                                </TouchableOpacity>
                            </View>
                            <Divider style={{ height: 1, backgroundColor: 'grey' }} />
                            <Text style={{ marginHorizontal: 20, marginTop: 5, fontSize: 16, color: COLORS.title, }}>{userDetails.email}</Text>
                            <Text style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 10, fontSize: 16, color: COLORS.title, }}>{userDetails.phone}</Text>

                        </View>
                    </View>
                    {/* <View style={{ marginHorizontal: 20, position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{}}>
                            <Icon source='wallet' size={30} color={COLORS.secondry} />
                        </View>

                        <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.title }}>:1000/-rs</Text>
                    </View> */}

                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        {/* <View>
                            <Text style={{ marginHorizontal: 20, fontSize: 16, fontWeight: '700', color: COLORS.title, }}>Order History:</Text>
                            <View style={{ marginHorizontal: 20, }}>
                                <Image source={require("../../assets/product.png")} style={{ height: 100, width: 100, resizeMode: 'contain' }} />
                                <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.title, }}>Combo 2</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: COLORS.title, }}>Combo of...</Text>
                                <Text style={{ color: COLORS.primary, fontSize: 18, fontWeight: '700' }}>18900/-</Text>
                            </View>
                        </View> */}
                        <View>
                            <Divider style={{ height: 1, backgroundColor: 'grey' }} />
                        </View>

                        <View style={{ marginTop: 10, marginHorizontal: 20, }}>

                            <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.title, }}>Address:</Text>
                            <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 10, paddingVertical: 10, marginTop: 10, borderRadius: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '400', color: COLORS.title, }}>1-A Street New City,Landmark</Text>
                                    <TouchableOpacity style={{}}>
                                        <Icon source='pencil-outline' size={25} color={COLORS.title} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: '400', color: COLORS.title, }}>ZIP CODE:{userDetails.zip}</Text>
                                <Text style={{ fontSize: 16, fontWeight: '400', color: COLORS.title, }}>Country</Text>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>
            <View style={{ height: 100 }}></View>
        </>
    )
}

export default AccountScreen;