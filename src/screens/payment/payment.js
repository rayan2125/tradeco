import { StyleSheet, Text, View, ActivityIndicator, Alert, Linking } from 'react-native';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { removeAllCart } from '../../redux/Reducers/cart.redux';

const Payment = ({ route }) => {

    let trnId = route.params?.data?.transactionId
    const dispatch = useDispatch()
    const payPageUrl = route.params?.data?.PayPageUrl;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    const handleDeepLink = (url) => {
        
        if (url.includes('tradeco://payment-success') || url.includes('panel.tradeco.in.net/api/v1/payment-redirect?status=success')) {
            // Alert.alert("Payment Successful", "Thank you for your payment!");
            dispatch(removeAllCart())
            let data ={
                trnId,
                status:'Sucess'
            }
            navigation.navigate('AfterPayment', data);
        } else if (url.includes('panel.tradeco.in.net/api/v1/payment-redirect?status=failed')) {
            // Alert.alert("Payment Failed", "There was an issue with your payment.");
            let data ={
                trnId,
                status:'Failed'
            }
            navigation.navigate('AfterPayment',data );
        }
    };

    if (!payPageUrl) {
        return (
            <View style={styles.centered}>
                <Text>No payment URL provided</Text>
            </View>
        );
    }

    return (
        <WebView
            source={{ uri: payPageUrl }}
            startInLoadingState={true}
            renderLoading={() => (
                <ActivityIndicator
                    color="blue"
                    size="large"
                    style={styles.loadingIndicator}
                />
            )}
            onLoadEnd={() => setLoading(false)}
            onError={(error) => {
              
                Alert.alert("Error", "An error occurred loading the payment page.");
            }}
            onNavigationStateChange={(event) => {

                // Check if the URL indicates payment success or failure
                if (event.url.includes('tradeco://payment-success') || event.url.includes('panel.tradeco.in.net/api/v1/payment-redirect')) {
                    handleDeepLink(event.url);
                } else if (event.url.includes('tradeco://payment-failed')) {
                    handleDeepLink(event.url);
                }
            }}
        />
    );
};

export default Payment;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
    },
});
