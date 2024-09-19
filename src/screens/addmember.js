import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import Button from '../components/button/button'
import IconInput from '../components/text/iconInput'
import { Icon } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const AddMember = () => {
    let navigation = useNavigation()
    return (
        <View style={{ flex: 1, margin: 20 }}>
            <TouchableOpacity
                onPress={() => navigation.pop()}
                style={{ backgroundColor: COLORS.primary, height: 40, width: 40, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                <Icon source="less-than" color={COLORS.white} />
            </TouchableOpacity>
            <View style={{flex:1,justifyContent:'center'}}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.title, textAlign: 'center' }}>Add New Member</Text>

                </View>
                <View style={{marginTop:10}}>
                    <IconInput />
                    <Button
                        title="GENERATE PIN"
                    />
                </View>
                <View style={{marginTop:20}}>
                    <IconInput />
                    <Button
                        title="SHARE"
                    />
                </View>
            </View>
        </View>
    )
}

export default AddMember

const styles = StyleSheet.create({})