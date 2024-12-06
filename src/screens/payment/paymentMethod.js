import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/header';
import { callAxios } from '../../services/api';
import { API_CONSTANTS } from '../../constants/ApiCollection';
import { RadioButton } from 'react-native-paper'; // Import RadioButton from react-native-paper
import Button from '../../components/button/button';
import { COLORS } from '../../constants/theme';
import { useDispatch } from 'react-redux';
import { removeAllCart } from '../../redux/Reducers/cart.redux';

const PaymentMethod = ({ route, navigation }) => {
    let dispatch = useDispatch()

    const [loading, setLoading] = useState(false); // State for loading indicator
    // State for selected payment method

    const details = route.params || {}; // Extract order details from route params

    let productType = details?.products[0].type
    const [selectedPayment, setSelectedPayment] = useState(productType === "gift" ? 'RewardPoints' : 'PhonePe');
    const handlePayment = async () => {
        setLoading(true);

        try {
            const res = await callAxios(API_CONSTANTS.createOrder, { ...details, paymentMethod: selectedPayment });
            console.log(res.data.error)
            if (res.success) {
                setLoading(false);
                if (selectedPayment === 'PhonePe') {
                    navigation.navigate('Payment', res);
                } else {
                    dispatch(removeAllCart());
                    navigation.navigate('AfterPayment', { status: 'Sucess' });
                    // Alert.alert(
                    //     'Your Order Confirmed!',
                    //     'Thank you for your payment.',
                    //     [
                    //         {
                    //             text: 'OK',
                    //             onPress: () => {
                    //                 dispatch(removeAllCart()); // Clear the cart
                    //                 navigation.navigate('AfterPayment', { status: 'Sucess' }); // Navigate to the Home screen
                    //             },
                    //         },
                    //     ]
                    // );
                }
            } else {
                setLoading(false);
                if (selectedPayment === 'PhonePe') {
                    Alert.alert('Payment Failed', 'Unable to initiate the payment.');
                } else {
                    Alert.alert('Insufficient Wallet Balance', 'Please use another payment method.');
                }
            }
        } catch (error) {
            setLoading(false);
            if (error.response) {
                console.log('Error Data:', error.response.data);
                console.log('Error Status:', error.response.status);
                console.log('Error Headers:', error.response.headers);
            } else if (error.request) {
                console.log('No Response Received:', error.request);
            } else {
                console.log('Error:', error.message);
            }
        }
    };

    return (
        <>
            <Header title="Payment Method" />
            <View style={styles.container}>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountLabel}>Amount:</Text>
                    <Text style={styles.amountValue}>{'\u20B9'}{route.params.totalAmount}</Text>
                </View>
                <Text style={styles.selectPaymentText}>Select a Payment Method:</Text>

                {/* Radio Button Group */}
                <RadioButton.Group
                    onValueChange={(value) => setSelectedPayment(value)}
                    value={selectedPayment}
                >
                    <View style={styles.radioContainer}>
                        <RadioButton value="PhonePe" />
                        <Text style={styles.radioLabel}>PhonePe</Text>
                    </View>
                    <View style={styles.radioContainer}>
                        <RadioButton value="RewardPoints" />
                        <Text style={styles.radioLabel}>Coins</Text>
                    </View>
                </RadioButton.Group>

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Button
                        title="Confirm Payment"
                        onPress={handlePayment}
                        disabled={loading || !selectedPayment} // Disable if no selection or loading
                    />
                )}
            </View>
        </>
    );
};

export default PaymentMethod;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    amountLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.title
    },
    amountValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28a745',
    },
    selectPaymentText: {
        fontSize: 18,
        marginVertical: 16,
        textAlign: 'center',
        color: COLORS.title
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    radioLabel: {
        fontSize: 16,
        marginLeft: 8,
        color: COLORS.title
    },
});
