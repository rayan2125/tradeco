import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header'
import { COLORS } from '../../constants/theme'
import Button from '../../components/button/button'
import { useNavigation } from '@react-navigation/native'
import { API_CONSTANTS } from '../../constants/ApiCollection'
import { callAxiosGet } from '../../services/api'
import { useDispatch } from 'react-redux'
import { removeAllCart } from '../../redux/Reducers/cart.redux'
import PaymentSkelton from '../../components/skeleton/paymentSkeleton'

const AfterPayment = ({ route }) => {

  let trnStatus = route?.params?.status


  let navigation = useNavigation()
  const handleNavigation = () => {
    navigation.navigate("Home")
  }
 
  return (

    <>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 28, textAlign: 'center', color: COLORS.title, fontWeight: '900', marginBottom: 10 }}>Payment Status</Text>

        {
          trnStatus === "Failed" ?
            <>
              <View style={{ alignItems: 'center' }}>

                <Image source={require("../../assets/failed.png")} style={{ height: 100, width: 100, resizeMode: 'center' }} />
                {/* <Text style={{ color: COLORS.title, fontSize: 18, fontWeight: '700' }}>Thank You</Text> */}
                <Text style={{ color: 'red', fontSize: 18, fontWeight: '400' }}>Your Payment Failed</Text>
                {/* <Text style={{ color: COLORS.title, fontSize: 18, fontWeight: '700' }}>#OrderID :{id}</Text> */}

              </View>

            </>


            :
            trnStatus === "Sucess" ?

              <View style={{ alignItems: 'center' }}>

                <Image source={require("../../assets/success.png")} style={{ height: 100, width: 100, resizeMode: 'center' }} />
                <Text style={{ color: COLORS.title, fontSize: 18, fontWeight: '700' }}>Thank You</Text>
                {/* <Text style={{ color: COLORS.title, fontSize: 18, fontWeight: '700' }}>#OrderID :{}</Text> */}
                <Text style={{ color: COLORS.title, fontSize: 18, fontWeight: '400' }}>Your Payment Successful</Text>

              </View>

              :
              <PaymentSkelton />
        }
        <View style={{ margin: 5 }}>

          <Button
            title="Home"
            onPress={() => handleNavigation()}
          />
        </View>
      </View>
    </>
  )
}

export default AfterPayment

const styles = StyleSheet.create({})