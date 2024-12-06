import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Image } from 'react-native';
import Button from '../../components/button/button';
import QRCode from 'react-native-qrcode-svg';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { COLORS } from '../../constants/theme';
import Header from '../../components/header';
import { Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { callAxios } from '../../services/api';
import { API_CONSTANTS } from '../../constants/ApiCollection';

const MemberShip = ({ route }) => {
    let navigation = useNavigation()
    const data = route.params

    let type = 'membership';
    let phone = route.params.phone

    const handlePayment = async () => {

        // setLoading(true);

        let req = {

            phone,
            type,

        };

        await callAxios(API_CONSTANTS.transactions, req).then((res) => {

            if (res.success && res.data.PayPageUrl) {

                navigation.navigate("Payment", res)

            } else {
                setLoading(false);
                Alert.alert("Payment Failed", "Unable to initiate the payment.");
            }
        }).catch((error) => {
            // Stop loading if an error occurs
            setLoading(false);
            console.error(error);
            Alert.alert("Error", "An error occurred during the payment process.");
        });
    };
    // navigation.navigate("Payment")




    return (
        <>
            <Header
                title="MemberShip" />
            <View style={{ flex: 1, justifyContent: 'center' }}>






                <View style={styles.modalContainer}>
                    <View style={styles.qrContainer} >

                        <Text style={{ textAlign: 'center', fontSize: 20, color: COLORS.secondry, fontWeight: "800" }}> TradeCO MemberShip</Text>


                        <Text style={{ fontSize: 26, color: COLORS.secondry, fontWeight: '700' }}>{'\u20B9'}{data.membership}</Text>

                    </View>


                </View>
                <View style={{ margin: 10 }}>

                    <Button
                        title="Proceed to Payment"
                        onPress={() => handlePayment()}
                    />
                </View>
            </View>
        </>

    );
};

export default MemberShip;

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        elevation: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: '#000',
        fontWeight: '800',
        textAlign: 'center',
    },
    price: {
        color: "#000",
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    },
    feature: {
        fontSize: 12,
        fontWeight: '400',
        color: 'black',
        marginVertical: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    qrContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        // bo
    },
    qrTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 20,
    },
});
