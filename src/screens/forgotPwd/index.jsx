import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import Header from '../../components/header';
import { callAxios } from '../../services/api';
import { API_CONSTANTS } from '../../constants/ApiCollection';
import { COLORS } from '../../constants/theme';

const ForgotPwdScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (phone.length !== 10 || isNaN(phone)) {
            setError('Phone number must be 10 digits');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const req = { phone };
            const res = await callAxios(API_CONSTANTS.forget, req);
         

            if (res.data.error) {
                setError(res.data.error); // API returned an error
            } else {
                setStep(2); // Proceed to OTP verification step
                Alert.alert(
                    'OTP Sent',
                    'An OTP has been sent to your phone number. Please check your messages.'
                );
            }
        } catch (err) {
            
            setError('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6 || isNaN(otp)) {
            setError('OTP must be 6 digits');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const req = { phone, otp };
            const res = await callAxios(API_CONSTANTS.verify, req);
           

            if (res.data.error) {
                // setError(res.data);
                Alert.alert(
                    'OTP has wrong',
                    'Please Enter Right OTP'
                );
            } else {
                Alert.alert('Success', 'Your OTP is verified. Proceeding to reset password.');
                // Navigate to Reset Password screen
                navigation.navigate('Login', { phone });
            }
        } catch (err) {
           
            setError('Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header title="Forgot Password" />
            <View style={styles.container}>
                {step === 1 ? (
                    <>
                        <Text style={styles.subtitle}>
                            Enter your phone number below, and we will send an OTP to reset your pin.
                        </Text>
                        <TextInput
                            placeholder="Enter your Phone"
                            style={styles.textinput}
                            keyboardType="numeric"
                            maxLength={10}
                            value={phone}
                            onChangeText={setPhone}
                        />
                        {error && <Text style={styles.errorText}>{error}</Text>}
                        <TouchableOpacity onPress={handleSend} disabled={loading}>
                            <View style={styles.button}>
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.buttonTxt}>Send OTP</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={styles.subtitle}>
                            Enter the OTP sent to your phone number for verification.
                        </Text>
                        <TextInput
                            placeholder="Enter OTP"
                            style={styles.textinput}
                            keyboardType="numeric"
                            maxLength={6}
                            value={otp}
                            onChangeText={setOtp}
                        />
                        {error && <Text style={styles.errorText}>{error}</Text>}
                        <TouchableOpacity onPress={handleVerifyOtp} disabled={loading}>
                            <View style={styles.button}>
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.buttonTxt}>Verify OTP</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.title,
        marginBottom: 20,
    },
    textinput: {
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
    },
    buttonTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});

export default ForgotPwdScreen;
