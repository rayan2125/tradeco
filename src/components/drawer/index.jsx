import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { COLORS } from "../../constants/theme";
import styles from "./styles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from "react-native-paper";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/Reducers/auth.redux";

const DrawerScreen = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.auth.adduser);
    const navigation = useNavigation();
    const currentRoute = useNavigationState(state => state.routes[state.index].name);

    const data = [
        { id: 1, name: 'Home', icon: 'home' },
        { id: 2, name: 'Terms and Conditions', icon: 'clipboard-edit' },
        { id: 3, name: 'Privacy Policy', icon: 'lock' },
        { id: 4, name: 'Refund Return Policy', icon: 'cash-refund' },
        { id: 5, name: 'Shipment Policy', icon: 'truck' },
    ];

    const handleNavigation = (id) => {
        switch (id) {
            case 1:
                if (currentRoute !== 'Home') {
                    navigation.navigate('Home',{screen:'Home'});
                }
                break;
            case 2:
                Linking.openURL("https://www.tradeco.in.net/terms-conditions/");
                break;
            case 3:
                Linking.openURL("https://www.tradeco.in.net/privacy-policy/");
                break;
            case 4:
                Linking.openURL("https://www.tradeco.in.net/refund_returns/");
                break;
            case 5:
                Linking.openURL("https://www.tradeco.in.net/shipment-policy/");
                break;
            default:
                break;
        }
    };

    const handleLogOut = async () => {
        try {
            // Clear the stored token
            await AsyncStorage.removeItem('token');

            // Reset the navigation stack and navigate to the login screen
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
            // Optionally dispatch to reset the user state
            // dispatch(setUser([]));

        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 10, borderColor: COLORS.primary, borderWidth: 1, borderRadius: 100, height: 150, width: 150, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require("../../assets/boy1.jpeg")} style={{ height: 140, width: 140, borderRadius: 100, resizeMode: 'cover' }} />
                </View>
                <Text style={{ fontSize: 24, fontWeight: '500', marginHorizontal: 20, marginBottom: 10, color: COLORS.title }}> Hey! {userDetails.name}</Text>
                <View>
                    <Divider style={{ height: 2 }} />
                    {
                        data.map((item) => (
                            <React.Fragment key={item.id}>
                                <TouchableOpacity
                                    onPress={() => handleNavigation(item.id)}
                                    style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', paddingVertical: 10, borderRadius: 15, paddingHorizontal: 5 }}>
                                    <Icon name={item.icon} color={COLORS.primary} size={30} />
                                    <Text style={{ color: COLORS.title, fontSize: 16, marginHorizontal: 20, width: '60%' }}>{item.name}</Text>
                                </TouchableOpacity>
                                <Divider style={{ height: 2 }} />
                            </React.Fragment>
                        ))
                    }
                </View>
            </View>
            <View style={{ bottom: 0, marginTop: 10 }}>
                <TouchableOpacity
                    onPress={handleLogOut}
                    style={{ elevation: 5, paddingHorizontal: 10, borderColor: 'grey', paddingVertical: 5, borderWidth: 0.1, backgroundColor: 'rgb(245,212,212)', alignItems: 'center', justifyContent: 'center', margin: 5 }}>
                    <Text style={{ textAlign: 'center', fontSize: 22, color: 'red', fontWeight: '800' }}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default DrawerScreen;
