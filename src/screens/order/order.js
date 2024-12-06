import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { callAxiosGet } from '../../services/api'
import { API_CONSTANTS } from '../../constants/ApiCollection'
import Header from '../../components/header'
import { COLORS } from '../../constants/theme'
import { useNavigation } from '@react-navigation/native'

const Order = () => {
    const [orders, setOrders] = useState([])
    let navigation = useNavigation()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        handleViewOrder()
    }, [])

    const handleViewOrder = async () => {
        try {
            const res = await callAxiosGet(API_CONSTANTS.listOrder)
            setOrders(res.data.orders)
            setLoading(false)
        } catch (error) {
          
            setLoading(false)
        }
    }

    const handleOrdrInfo = (item) => {
        navigation.navigate("OrderInfo", item)
    }
    const renderOrderItem = ({ item }) => (
    
        <TouchableOpacity
            onPress={() => handleOrdrInfo(item)}
            style={styles.orderItem}>
            <Text style={{ color: COLORS.title }}>Date: {item.date}</Text>
            <Text style={{ color: COLORS.title }}>#Order Number: {item.orderNumber}</Text>
            <Text style={{ color: COLORS.title }}>#Order ID: {item.id}</Text>
            <Text style={{ color: COLORS.title }}>Status: {item.status}</Text>
            <Text style={{ color: COLORS.title }}>Total: {'\u20B9'}{item.amount}</Text>
        </TouchableOpacity>
    )

    return (
        <>
            <Header
                title="Order History"
            />
            <View style={styles.container}>
                {loading ? (
                    <Text>Loading orders...</Text>
                ) : (
                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderOrderItem}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<Text>No orders found.</Text>}
                    />
                )}
            </View>
        </>
    )
}

export default Order

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    orderItem: {
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
})
