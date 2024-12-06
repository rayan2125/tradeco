import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from './styles';
import { COLORS } from "../../constants/theme";
import { Divider, Icon } from "react-native-paper";
import { ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { callAxiosGet } from "../../services/api";
import { API_CONSTANTS } from "../../constants/ApiCollection";
import { useSelector } from "react-redux";
// import icom from 'react-native-vector-icons/ic'
const AccountScreen = () => {
    useEffect(() => {
        handleProfile()
    }, [])


    const userImg = useSelector(state => state.auth.userImg);
    const [userInfo, setUserInfo] = useState('')

    let navigation = useNavigation()

    const handleProfile = async () => {
        await callAxiosGet(API_CONSTANTS.profile).then((res) => {
            setUserInfo(res.data)
        })
    }
    const handleNavigation = () => {
        navigation.navigate('Profile', userInfo)
    }
    useFocusEffect(
        useCallback(() => {
            handleProfile();
        }, [])
    );
    return (
        <>
            <View style={[styles.container, { marginTop: 10 }]}>
                <ScrollView>
                    <View>
                        <View style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 10, borderColor: COLORS.primary, borderWidth: 1, borderRadius: 100, height: 160, width: 160, justifyContent: 'center', alignItems: 'center' }}>

                            <Image source={{ uri: userImg || userInfo.image }} style={{ height: 150, width: 150, borderRadius: 100, resizeMode: 'cover' }} />
                        </View>
                        <View style={{}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                <Text style={{ fontSize: 20, fontWeight: '500', color: COLORS.title, marginHorizontal: 20, marginBottom: 10 }}>{userInfo.name}</Text>
                                <TouchableOpacity
                                    onPress={() => handleNavigation()}
                                    style={{ marginHorizontal: 10 }}>
                                    <Icon source='pencil-outline' size={25} color={COLORS.title} />
                                </TouchableOpacity>
                            </View>
                            <Divider style={{ height: 1, backgroundColor: 'grey' }} />
                            <Text style={{ marginHorizontal: 20, marginTop: 5, fontSize: 16, color: COLORS.title, }}>{userInfo.email}</Text>
                            <Text style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 10, fontSize: 16, color: COLORS.title, }}>{userInfo.phone}</Text>

                        </View>
                    </View>


                    <View style={{ marginTop: 10, marginBottom: 10 }}>

                        <View>
                            <Divider style={{ height: 1, backgroundColor: 'grey' }} />
                        </View>

                        <View style={{ marginTop: 10, marginHorizontal: 20, }}>

                            <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.title, }}>Address:</Text>
                            <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 10, paddingVertical: 10, marginTop: 10, borderRadius: 10, borderColor: COLORS.primary, borderWidth: 1 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '400', color: COLORS.title, }}>{userInfo.address} | {userInfo.address2}</Text>

                                </View>

                                <Text style={{ fontSize: 16, fontWeight: '400', color: COLORS.title, }}>City: {userInfo.city}</Text>
                                <Text style={{ fontSize: 16, fontWeight: '400', color: COLORS.title, }}>State: {userInfo.state}</Text>
                                <Text style={{ fontSize: 16, fontWeight: '400', color: COLORS.title, }}>ZIP CODE:{userInfo.zip}</Text>
                                <Text style={{ fontSize: 16, fontWeight: '400', color: COLORS.title, }}>Country:IND</Text>
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