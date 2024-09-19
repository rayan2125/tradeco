import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import IconInput from '../../components/text/iconInput'
import Button from '../../components/button/button'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'
import { callAxios } from '../../services/api'
import { API_CONSTANTS } from '../../constants/ApiCollection'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
    let navigation = useNavigation()

    const [state, setState] = useState({
        phone: '',
        pin: ''
    })

    const [errors, setErrors] = useState({
        phone: '',
        pin: ''
    })

    // phone validation regex


    const validatepin = (pin) => {
        // For example, check if pin is at least 6 characters long
        return pin.length >= 6;
    };

    const handleSubmit = async (state) => {

        const { phone, pin } = state;
        let isValid = true;

        let newErrors = { phone: '', pin: '' };

        // Validate phone
        if (!phone) {
            newErrors.phone = "phone is required";
            isValid = false;
        }

        // Validate pin
        if (!pin) {
            newErrors.pin = "pin is required";
            isValid = false;
        } else if (!validatepin(pin)) {
            newErrors.pin = "pin must be at least 6 characters";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            // Proceed with login (e.g., API call)
            let req = {
                phone: state.phone,
                code: state.pin
            }
            await callAxios(API_CONSTANTS.login, req).then((res) => {
              
                if (res.success === true) {
                    navigation.navigate("Home")
                    let token= res.data.token
                    // console.log(token)
                    AsyncStorage.setItem('token',token)
                }
            })
            // navigation.navigate("Home")
            // Alert.alert("Login successful", `Welcome, ${phone}`);

        } else {
            // Alert.alert("Login failed", "Please check the errors.");
        }
    }

    return (
        <View style={{ flex: 1, margin: SIZES.h2, justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: SIZES.h1, color: COLORS.primary, fontWeight: '600' }}>Sign In</Text>
            </View>
            <View>
                <IconInput
                    title="Phone"
                    value={state.phone}
                    keyboardType="numeric"
                    maxLength={10}
                    error={errors.phone}
                    onChangeText={(value) => setState({ ...state, phone: value })}
                    left={<TextInput.Icon icon="eye" />}
                />
                <IconInput
                    title="pin"
                    value={state.pin}
                    error={errors.pin}
                    onChangeText={(value) => setState({ ...state, pin: value })}
                    secureTextEntry={true}
                    left={<TextInput.Icon icon="eye" />}
                />
                <View style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={{ color: COLORS.blue, fontWeight: '700', fontSize: SIZES.h5 }}>
                        Forgot pin
                    </Text>
                    {/* <Text>icon</Text>/ */}
                </View>
                <Button
                    title="Submit"
                    onPress={() => handleSubmit(state)}
                />
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({})
