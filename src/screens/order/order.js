import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { callAxiosGet } from '../../services/api'
import { API_CONSTANTS } from '../../constants/ApiCollection'

const Order = () => {
    const [orders, setOrders] = useState([])

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
            console.error('Error fetching orders:', error)
            setLoading(false)
        }
    }

    const renderOrderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <Text> #Order Number: {item.orderNumber}</Text>
            <Text> #Order ID: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Total: ${item.amount}</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading orders...</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderOrderItem}
                    ListEmptyComponent={<Text>No orders found.</Text>}
                />
            )}
        </View>
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
