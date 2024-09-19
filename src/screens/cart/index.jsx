import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from './styles';
import { COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
    let navigation =useNavigation()
    const handleNavigation=()=>{
        navigation.navigate("Products")
    }
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/cart.png")} style={{ height: 300, resizeMode: 'contain' }} />
            <TouchableOpacity
            onPress={()=>handleNavigation()}
            style={{ borderRadius: 100, borderWidth: 1, borderColor: COLORS.secondry, paddingHorizontal: 50, paddingVertical: 10 }}>
                <Text style={{ fontSize: 18, color: COLORS.secondry, fontWeight: '700' }}>Add Items</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CartScreen;