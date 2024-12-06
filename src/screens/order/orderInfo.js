import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header'
import { callAxiosGet } from '../../services/api'
import { API_CONSTANTS } from '../../constants/ApiCollection'
import { COLORS } from '../../constants/theme'
import { Divider } from 'react-native-paper'
import TeamSkeleton from '../../components/skeleton/teamSkeleton'

const OrderInfo = ({ route }) => {
  // Accessing the order data from route params
  const data = route.params
  let id = data.id
  useEffect(() => {
    orderInfo()
  }, [])
  const [orderInfoDtatas, setOrderInfo] = useState('')

  const orderInfo = async () => {
    await callAxiosGet(`${API_CONSTANTS.createOrder}/${id}`).then((res) => {
      
      setOrderInfo(res.data)

    })
  }
  return (
    <>
      <Header title="Order History" />
      {
        orderInfoDtatas &&
          orderInfoDtatas ?
          <ScrollView
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          >
            <Text style={{ fontSize: 28, color: COLORS.title, marginBottom: 10 }}>Order View Details</Text>
            <View style={{ borderColor: COLORS.grey, borderWidth: 1, borderRadius: 10, paddingVertical: 10 }}>


              <View style={styles.card}>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={styles.label}>Order Date:</Text>
                  <Text style={[styles.value,]}>{data.date}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 5, }}>
                  <Text style={styles.label}>Order#:</Text>
                  <Text style={[styles.value,]}>{data.orderNumber}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 5, }}>
                  <Text style={styles.label}>Amount:</Text>
                  <Text style={[styles.value,]}>₹{data.amount}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                  <Text style={styles.label}>Payment Method:</Text>
                  <Text style={[styles.value]}>{data.payment_method}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5, }}>
                  <Text style={[styles.label, { paddingHorizontal: 5, paddingVertical: 5, }]}>Status:</Text>
                  <Text style={[styles.value, { color: COLORS.title,  width: '30%', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 30, textAlign: 'center' }]}>{orderInfoDtatas.status}</Text>
                </View>

              </View>


              <View style={[styles.card, { backgroundColor: 'grey', bottom: 20, margin: 10, elevation: 10 }]}>
                <Text style={{ fontSize: 18, color: COLORS.white, }}>Shipping Address</Text>
                <Text style={[styles.value, { color: COLORS.white, }]}>{orderInfoDtatas.name}</Text>
                <View style={{}}>
                  <Text style={[styles.value, { color: COLORS.white, }]}>{orderInfoDtatas.address} | {orderInfoDtatas.address2}</Text>
                  <Text style={[styles.value, { color: COLORS.white, }]}>{orderInfoDtatas.city} | {orderInfoDtatas.state}</Text>
                  <Text style={[styles.value, { color: COLORS.white, }]}> | {orderInfoDtatas.zip}</Text>
                </View>
              </View>

              <Divider style={{ height: 1, backgroundColor: COLORS.grey, margin: 5 }} />
              <View style={styles.card}>
                <Text style={{ fontSize: 22, color: COLORS.title, fontWeight: "800" }}>Items</Text>
                {orderInfoDtatas?.items?.length > 0 ? (
                  orderInfoDtatas.items.map((item, index) => (
                    <View key={index} style={styles.productCard}>
                      <Image
                        source={
                          item.image
                            ? { uri: item.image }
                            : require('../../assets/iron.jpg')
                        }
                        style={styles.productImage}
                      />
                      <View style={styles.productDetails}>
                        <Text style={styles.value}>{item.product?.name || 'Iron'}</Text>
                        <Text style={styles.value}>Quantity: {item.quantity}</Text>
                        <Text style={styles.value}>Price: ₹{item.price}</Text>
                        <Text style={styles.value}>Total: ₹{item.amount}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={{ fontSize: 16, color: COLORS.gray }}>No products available</Text>
                )}
              </View>





            </View>
          </ScrollView> :
          <TeamSkeleton />
      }


    </>
  )
}

export default OrderInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: COLORS.white,
    // elevation: 10,
    // borderColor: 'black', borderWidth: 1,
    // marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  }, productImage: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,

  },
  deliveryCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.title,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },
  shippingCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.title,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    width: 100
  },
  value: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',

  },
});

