import 'react-native-get-random-values'; // Add this line to polyfill getRandomValues
import { Modal, StyleSheet, Text, TouchableOpacity, View, NativeModules } from 'react-native';
import React, { useEffect, useState } from 'react';
import { callAxios, callAxiosGet } from '../../services/api';
import { API_CONSTANTS } from '../../constants/ApiCollection';
import { COLORS } from '../../constants/theme';
import Button from '../../components/button/button';
import { Icon } from 'react-native-paper';
import { AlertNotificationRoot, ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Timmer from '../../components/card/timmer';
import RNUpiPayment from "react-native-upi-payment";
import { v4 as uuidv4 } from 'uuid';

const Payment = () => {
    const [openModal, setOpenModal] = useState(false);
    const [timer, setTimer] = useState(5 * 60);
    const [statusCheckInterval, setStatusCheckInterval] = useState(null);
   
   
    const handlePayment = async () => {
        const upiTransactionId = Date.now()
console.log(upiTransactionId)
    RNUpiPayment.initializePayment({
        vpa: "9425129745@hdfcbank", // UPI ID of the payee
        payeeName: 'TRADECO', // Name of the receiver
        amount: '1.00', // Amount to be paid
        transactionNote: 'TradeCo Yearly Membership Subscription Plans', // Description of payment
        trtxnRef: upiTransactionId, // Unique transaction reference (limited to 12 characters)
    },
    successCallback,  // Callback for success
    failureCallback   // Callback for failure
    );
};
        

    function successCallback(data) {
        console.log("Payment Success: ", data);
    }

    function failureCallback(data) {
        console.log("Payment Failed: ", data);
    }

    const startTimer = () => {
        let timeLeft = timer;
        const intervalId = setInterval(() => {
            timeLeft -= 1;
            setTimer(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(intervalId); // Stop the timer when time runs out
                setOpenModal(false); // Close the modal when time runs out
                clearInterval(statusCheckInterval); // Stop status check when time runs out
            }
        }, 1000); // Timer interval (1 second)
    };

    useEffect(() => {
        return () => {
            if (statusCheckInterval) {
                clearInterval(statusCheckInterval); // Cleanup on component unmount
            }
        };
    }, []);

    return (
        <AlertNotificationRoot>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, margin: 20, justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', elevation: 10, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, color: COLORS.title, fontWeight: '800', textAlign: 'center' }}>Membership Plan</Text>
                        </View>
                        <Text style={{ color: "#000000", fontSize: 18, fontWeight: '700', textAlign: 'center' }}>3000/-</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                            <View style={{ backgroundColor: 'rgba(11,11,11,.8)', height: 20, width: 20, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon source='check' color='white' />
                            </View>
                            <Text style={{ marginHorizontal: 10, fontSize: 12, fontWeight: '400', color: 'black' }}>Feature description here</Text>
                        </View>
                    </View>
                </View>
                <View style={{ margin: 20 }}>
                    <Button
                        title="Pay Now"
                        onPress={handlePayment}
                    />
                </View>
                <Modal
                    transparent={true}
                    visible={openModal}
                >
                    {<Timmer time={timer} />}
                </Modal>
            </View>
        </AlertNotificationRoot>
    );
};

export default Payment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
