import React, { useState } from "react";
import { SafeAreaView, View, Text, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import { COLORS } from "../../constants/theme";
import styles from "./styles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";


const DrawerScreen = ({ navigation }) => {

    const [location, setLocation] = useState();
    const [cuisines, setCuisines] = useState(1);

    const [open, setOpen] = useState(false);
    const [creditCard, setCreditCard] = useState(false);
    const [free, setFree] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: 250, }}>
                <LinearGradient colors={[COLORS.secondry, COLORS.primary, COLORS.primary, COLORS.secondry]} style={{ height: 250 }} >
                    <View style={{ margin: 30 }}>

                        <View style={{ height: 100, width: 100, borderRadius: 100, backgroundColor: 'white', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                            <Image source={require("../../assets/profile.jpg")} style={{ height: 80, width: 80, borderRadius: 100 }} />
                        </View>
                        <Text style={{ fontSize: 30, color: 'white', fontWeight: '900', letterSpacing: 0.4, marginTop: 20 }}>Hello ,Abhshek</Text>
                    </View>
                </LinearGradient>
                <View style={{ margin: 10 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderRadius: 15, paddingHorizontal: 5, }}>

                        <Icon name='account' color={COLORS.white} size={30} />
                        <Text style={{ color: COLORS.white, fontSize: 18, marginHorizontal: 20 }}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderRadius: 15, paddingHorizontal: 5, }}>

                        <Icon name='clipboard-edit' color={COLORS.white} size={30} />
                        <Text style={{ color: COLORS.white, fontSize: 18, marginHorizontal: 20 }}>Terms and Conditions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderRadius: 15, paddingHorizontal: 5, }}>

                        <Icon name='lock' color={COLORS.white} size={30} />
                        <Text style={{ color: COLORS.white, fontSize: 18, marginHorizontal: 20 }}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderRadius: 15, paddingHorizontal: 5, }}>

                        <Icon name='cash-refund' color={COLORS.white} size={30} />
                        <Text style={{ color: COLORS.white, fontSize: 18, marginHorizontal: 20 }}>Refund Return Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderRadius: 15, paddingHorizontal: 5, }}>

                        <Icon name='truck' color={COLORS.white} size={30} />
                        <Text style={{ color: COLORS.white, fontSize: 18, marginHorizontal: 20 }}>Shipment Policy</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View>
            </View>
            <View style={{ bottom: 0,marginTop:10 }}>
                <Divider style={{ height: 1, backgroundColor: 'grey' }} />
                <TouchableOpacity style={{ flexDirection: 'row', margin: 50, elevation: 10, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#D8A3DC', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='logout' size={25} color={COLORS.title} />
                    <Text style={{ textAlign: 'center', fontSize: 18, color: COLORS.title }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default DrawerScreen;