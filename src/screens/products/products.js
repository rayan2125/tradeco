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
import { useDispatch } from 'react-redux';
import { addCart } from '../../redux/Reducers/cart.redux';

const Products = () => {
  let navigation = useNavigation();
  let dispatch = useDispatch()
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
  const handleCart = (item) => {
    dispatch(addCart(item))
    navigation.navigate("Cart")
  }
  return (
    <>
      <Header
        title="Products"
        fIcon="magnifying-glass"
        pIcon="cart"
        cPress={() => navigation.navigate('Cart')}
        left={20}
      />
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={{ flex: 1, alignItems: 'center', gap: 5 }}>
          {
            products.length > 0 ?
              <FlatList
                data={products}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ borderColor: COLORS.secondry, borderWidth: 1, borderRadius: 10, margin: 2, width: '49%' }} key={index}>
                      <TouchableOpacity
                        onPress={() => handleNavigation(item)}
                        style={{ alignItems: 'center', height: 145, }}>
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

                      <View style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, top: 5, paddingHorizontal: 10, paddingVertical: 10, }}>
                        <Text style={{ width: 100, textAlign: 'left', color: COLORS.secondry, fontSize: 14, fontWeight: '500' }}>{item.name.slice(0, 10)}</Text>

                        <Text style={{ fontSize: 20, color: COLORS.title, fontWeight: '500' }}>{item.price} rs/-</Text>
                        <Text style={{ fontSize: 12, color: COLORS.title, fontWeight: '500' }}>{item.description.slice(0, 25)}</Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>


                          <TouchableOpacity
                            onPress={() => handleNavigation(item)}
                            style={{ backgroundColor: COLORS.primary, height: 30, borderRadius: 100, marginTop: 10, width: 80, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon source='eye' size={18} color={COLORS.white} />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleCart(item)}
                            style={{ borderColor: COLORS.primary, borderWidth: 1, borderRadius: 100, marginTop: 10, height: 30, width: 80, justifyContent: 'center', alignItems: 'center' }}>

                            <Icon source='medical-bag' size={18} color={COLORS.primary} />
                          </TouchableOpacity>
                        </View>
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


                  <ProductsSkelton key={index} />



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
