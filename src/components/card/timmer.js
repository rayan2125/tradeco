import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme'

const Timmer = ({ onClose, time }) => {
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '(rgba(10,10,10,0.4)' }}>
            <View style={{ backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 25 }}>
                <Text style={{ color: COLORS.secondry, fontSize: 14, fontWeight: '500' }}>
                    Please Wait for Payment Confirmation
                </Text>
                <View style={{ alignSelf: 'center' }}>
                    <Image source={require("../../assets/clock.png")} style={{ height: 100, width: 100, resizeMode: 'contain' }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', }}>


                    <Text style={{ color: COLORS.title, fontSize: 18, fontWeight: '500' }}>Time left: {formatTime(time)}</Text>


                </View>

            </View>
        </View>
    )
}

export default Timmer

const styles = StyleSheet.create({})