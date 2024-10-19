import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import IconInput from '../../components/text/iconInput'
import Button from '../../components/button/button'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'
import { callAxios } from '../../services/api'
import { API_CONSTANTS } from '../../constants/ApiCollection'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AlertNotificationRoot, ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import {
    SkypeIndicator,
} from 'react-native-indicators';
import { useDispatch,useSelector } from 'react-redux'
import { setUser } from '../../redux/Reducers/auth.redux'
const Login = () => {
    let userDetails = useSelector(state => state.auth.adduser)


    let dispatch = useDispatch()
    let navigation = useNavigation()

    const [state, setState] = useState({
        phone: '',
        pin: ''
    })

    const [errors, setErrors] = useState({
        phone: '',
        pin: ''
    })
    const [indicator, setIndicator] = useState(false)
    const validatepin = (pin) => {
        return pin.length >= 6;
    };

    const handleSubmit = async (state) => {
        const { phone, pin } = state;
        let isValid = true;
        let newErrors = { phone: '', pin: '' };

        if (!phone) {
            newErrors.phone = "phone is required";
            isValid = false;
        }

        if (!pin) {
            newErrors.pin = "pin is required";
            isValid = false;
        } else if (!validatepin(pin)) {
            newErrors.pin = "pin must be at least 6 characters";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            setIndicator(true)
            let req = {
                phone: state.phone,
                code: state.pin
            }
            await callAxios(API_CONSTANTS.login, req).then((res) => {
                setIndicator(false)

                if (res.success === true) {

                    // Dialog.show({
                    //     type: ALERT_TYPE.SUCCESS,
                    //     title: 'Login Successful',
                    //     textBody: `Welcome, ${phone}`,
                    //     button: 'close',
                    //     onPressButton: () => {
                    //         Dialog.hide();  // Hide the dialog manually
                    //         let token = res.data.token;
                    //         AsyncStorage.setItem('token', token);
                    //         navigation.navigate("Home");  // Navigate after hiding the dialog
                    //     }
                    // });
                    let userInfo = res.data.user;
                    dispatch(setUser(userInfo))
                    let token = res.data.token;
                    AsyncStorage.setItem('token', token);
                    if (userInfo.status === 'pending') {

                        navigation.navigate("NewProfile");
                    } else {
                        navigation.navigate("Home");
                    }


                } else {
                    Dialog.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Login Failed',
                        textBody: res.data.error.data.phone || res.data.error.data.code,
                        button: 'close',
                    });
                }
            })
        }
    }

    return (
        <AlertNotificationRoot>
            <View style={{ flex: 1, margin: SIZES.h2 }}>

                <View style={{ flex: 1, justifyContent: 'center' }}>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ marginBottom: 50 }}>
                            <Image source={require("../../assets/logo.png")} style={{ height: 180, width: 190, resizeMode: 'contain' }} />
                        </View>
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
                            title="Pin"
                            value={state.pin}
                            keyboardType="numeric"
                            error={errors.pin}
                            maxLength={6}
                            onChangeText={(value) => setState({ ...state, pin: value })}
                            secureTextEntry={true}
                            left={<TextInput.Icon icon="eye" />}
                        />
                        <View style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={{ color: 'red', fontWeight: '500', fontSize: SIZES.h3 }}>
                                Forgot Pin
                            </Text>
                        </View>
                        {
                            indicator &&
                            <View style={{ position: 'absolute', right: '50%', left: '50%', top: '50%', bottom: '50%' }}>

                                <SkypeIndicator
                                    color='green'
                                    size={50}
                                />
                            </View>
                        }
                        <Button
                            title="Submit"
                            onPress={() => handleSubmit(state)}
                        />
                    </View>
                </View>
            </View>
        </AlertNotificationRoot>
    )
}

export default Login

const styles = StyleSheet.create({})
