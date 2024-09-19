import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme'

const SettingCard = ({ title, src }) => {
    return (
        <TouchableOpacity
        
        style={{
            height: 170, width: 130, backgroundColor: COLORS.white, borderRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 20,
            elevation: 10, minHeight: 10, alignItems: 'center'
        }}>
            <Image source={src} style={{ height: 90, width: 90, resizeMode: 'contain' }} />
            <Text style={{fontSize:12,marginTop:5,textAlign:'center',fontWeight:'600',color:COLORS.secondry}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default SettingCard

const styles = StyleSheet.create({})