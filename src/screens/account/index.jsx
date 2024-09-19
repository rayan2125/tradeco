import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from './styles';
import { COLORS } from "../../constants/theme";

const AccountScreen = () => {
    useEffect(() => {

    })
    return (
        <View style={[styles.container, { margin: 20, }]}>
            <View>
                <View style={{ alignSelf: '' }}>

                    <Image source={require("../../assets/profile.jpg")} style={{ height: 150, width: 150, borderRadius: 100 }} />
                </View>
                <View style={{  }}>

                    <Text style={{fontSize:24,fontWeight:'500',}}>Darshan Desai</Text>
                    <Text>EMail</Text>
                    <Text>Phone</Text>
                </View>
            </View>
            <View style={{}}>
                <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginTop: 10 }}>

                    <Text>Address</Text>
                    <Text>Address</Text>
                    <Text>Address</Text>
                </View>
                <TouchableOpacity style={{ marginTop: 20, backgroundColor: COLORS.primary, width: "100%", borderRadius: 20, alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, color: COLORS.white }}>Add Address</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
        // onPress={()=>}
            style={{ backgroundColor: COLORS.grey, width: "30%", borderRadius: 20,alignSelf:'center', alignItems: 'center',marginTop:10, paddingHorizontal: 10, paddingVertical: 10 }}>
                <Text style={{ fontSize: 16, color: COLORS.white }}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AccountScreen;