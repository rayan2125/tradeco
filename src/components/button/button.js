import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme'
import { useNavigation } from '@react-navigation/native'

const Button = ({ title, onPress }) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor: COLORS.secondry, borderRadius: 100, paddingHorizontal: 10, paddingVertical: 10, alignItems: 'center', marginTop: 10, elevation: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: '500', color: COLORS.white }}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({})