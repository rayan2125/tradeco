import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import { callAxiosGet } from '../../services/api';
import { API_CONSTANTS } from '../../constants/ApiCollection';
import Button from '../../components/button/button';
import ProductsSkelton from '../../components/skeleton/productsSkeleton';
import Header from '../../components/header';

const Products = () => {
  let navigation = useNavigation();

  const [selectedItems, setSelectedItems] = useState({}); // State to track selected items
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleProducts();
  }, []);

  const handleProducts = async () => {
    await callAxiosGet(API_CONSTANTS.product).then((res) => {
      let data = res.data;
      setProducts(data);
    });
  };

  const handleNavigation = (item) => {
    navigation.navigate("ViewProducts", item);
  };

  const handleSelected = (itemId) => {
    // Toggle selection state for each item
    setSelectedItems(prevSelected => ({
      ...prevSelected,
      [itemId]: !prevSelected[itemId]
    }));
  };

  return (
    <>
      <Header />
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {
            products.length > 0 ?
              <FlatList
                data={products}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ margin: 2 }} key={index}>
                      <TouchableOpacity
                        onPress={() => handleNavigation(item)}
                        style={{ alignItems: 'center', height: 145, width: 180 }}>
                        <Image
                          source={{ uri: item.image }}
                          style={{ height: 150, width: 165, resizeMode: 'contain', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ position: 'absolute', right: 10, top: 0 }}
                        onPress={() => handleSelected(item.id)}
                      >
                        <Icon
                          source={selectedItems[item.id] ? "heart" : "cards-heart-outline"}
                          size={25}
                          color={selectedItems[item.id] ? "red" : "black"}
                        />
                      </TouchableOpacity>

                      <View style={{ backgroundColor: 'rgb(222,222,222)', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', marginBottom: 10, paddingHorizontal: 10, paddingVertical: 10, margin: 5 }}>
                        <Text style={{ width: 100, textAlign: 'center', color: 'rgb(101,101,101)', fontWeight: '500' }}>{item.name.slice(0, 10)}</Text>
                        <Text style={{ fontSize: 20, color: 'rgb(101,101,101)', fontWeight: '500' }}>{item.price} rs/-</Text>
                        <TouchableOpacity
                          onPress={() => handleNavigation(item)}
                          style={{ borderColor: 'rgb(101,101,101)', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 100, marginTop: 10, width: 100, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: "black", fontSize: 14, fontWeight: '500' }}>View</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
              :
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={Array(6).fill(0)}
                renderItem={({ item, index }) => (
                  // <ProductsSkelton key={index} /> 
                  <Text>testing</Text>
                  // You can use a skeleton loader here
                )}
              />
          }
        </View>
      </View>
    </>
  );
};

export default Products;

const styles = StyleSheet.create({});
