import React from "react";
import { View, Text, FlatList } from "react-native";
import styles from './styles';
import Button from "../../components/button/button";
import Header from "../../components/header";
import SettingCard from "../../components/card/settingCard";

const Setting = () => {
    const data = [
        {
            id: 1,
            title: "Terms & Conditions",
            img: require("../../assets/terms-condition.png")
        },
        {
            id: 2,
            title: "Privacy Policy",
            img: require("../../assets/policy.png")
        },
        {
            id: 3,
            title: "Refunds Returns Policy",
            img: require("../../assets/refund.png")
        },
        {
            id: 4,
            title: "Shipment Policy",
            img: require("../../assets/shipment.png")
        },

    ]
    return (
        <>
            {/* <Header /> */}
            <View style={styles.container}>
                <FlatList
                    data={data}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                key={index}
                                style={{ marginHorizontal: 20, margin: 20, marginVertical: 20 }}>

                                <SettingCard

                                    title={item.title}
                                    src={item.img}
                                />
                            </View>
                        )
                    }} />
            </View>
        </>
    )
}

export default Setting;