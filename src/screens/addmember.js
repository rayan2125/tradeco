import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants/theme'
import Button from '../components/button/button'
import IconInput from '../components/text/iconInput'
import { Icon } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/header'
import { callAxios } from '../services/api'
import { API_CONSTANTS } from '../constants/ApiCollection'

const AddMember = () => {
    const navigation = useNavigation()
    const [phone, setPhone] = useState('')
    const [pin, setPin] = useState('')
    const [error, setError] = useState(null)
    const handlePin = async () => {
        if (phone.length !== 10) {
            setError('Phone number must be 10 digits')
            return
        }
        try {
            const req = { phone } 
            const res = await callAxios(API_CONSTANTS.pin, req)

            if (res.data.error) {
                setError(res.data.error) // Handle API error response
            } else {
                setPin(res.data.pin) // Assuming API returns the generated PIN
                setError(null) // Clear any previous error
            }
        } catch (error) {
            console.log(error)
            setError('Failed to generate PIN. Please try again.')
        }
    }
    return (
        <>
            <Header title="Add Members" />
            <View style={{ flex: 1, margin: 20 }}>

                <View style={{ flex: 1, }}>

                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: COLORS.title, marginBottom: 10 }}>Enter Phone Number:</Text>
                        <IconInput
                            keyboardType="numeric"
                            maxLength={10}
                            value={phone}
                            onChangeText={setPhone}
                        />
                        {error && <Text style={styles.errorText}>{error}</Text>}
                        <Button
                            title="GENERATE PIN"
                            onPress={handlePin}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: COLORS.title, marginBottom: 10 }}>Generated Pin Code:</Text>
                        <IconInput
                            keyboardType="numeric"
                            editable={false}
                            value={pin.toString() || '######'}
                        />
                        <Button
                            title="SHARE"
                        />
                    </View>
                </View>
            </View>
        </>
    )
}

export default AddMember

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    content: {
        flex: 1,
    },
    inputContainer: {
        marginTop: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        color: COLORS.title,
        marginBottom: 10,
    },
    pinContainer: {
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
})