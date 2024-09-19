import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../constants/theme'
import { callAxiosGet } from '../../services/api'
import { API_CONSTANTS } from '../../constants/ApiCollection'
import Button from '../../components/button/button'
import ProductsSkelton from '../../components/skeleton/productsSkeleton'

const Products = () => {
  let navigation = useNavigation()
  useEffect(() => {
    handleProducts()
  }, [])
  const data = ["1", "2", "3", "4", "5", "6",]
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const handleProducts = async () => {
    await callAxiosGet(API_CONSTANTS.product).then((res) => {
      let data = res.data
      setProducts(data)
    })
  }
  const handleNavigation = (item) => {
    navigation.navigate("ViewProducts", item)
  }
  return (
    <View style={{ flex: 1, }}>
      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={{ backgroundColor: COLORS.primary, height: 40, width: 40, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
        <Icon source="less-than" color={COLORS.white} />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {
          products.length > 0 ?
            <FlatList
              data={products}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <>
                <View>

                  <TouchableOpacity
                    onPress={() => handleNavigation(item)}
                    key={index} style={{  alignItems: 'center', elevation: 10, height: 200, width: '50%', justifyContent: 'space-around' }}>

                    <View style={{ backgroundColor: COLORS.grey }}>
                      <Image source={{ uri: item.image }} style={{ height: 80, width: 80, resizeMode: 'contain' }} />
                    </View>
                  </TouchableOpacity>
                    <View style={{ backgroundColor: COLORS.white, width: '100%' }}>
                      <Text style={{ width: 100, textAlign: 'center' }}>{item.name.slice(0, 10)}</Text>
                      <Text style={{ fontSize: 18, color: COLORS.secondry }}>{item.price} rs/-</Text>
                      <TouchableOpacity
                        onPress={() => handleNavigation(item)}
                        style={{ backgroundColor: COLORS.primary, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 100, marginTop: 10, width: 100, justifyContent: 'center', alignItems: 'center', elevation: 10 }}>
                        <Text style={{ color: "black", fontSize: 14, fontWeight: '300' }}>View</Text>
                      </TouchableOpacity>
                    </View>
                </View>
                  </>
                )
              }} /> :
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={data}
              renderItem={({ item, index }) => {
                return (

                  <ProductsSkelton />
                )
              }} />
        }
      </View>
    </View>
  )
}

export default Products

const styles = StyleSheet.create({})