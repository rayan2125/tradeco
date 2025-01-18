import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import { callAxiosGet } from '../../services/api';
import { API_CONSTANTS } from '../../constants/ApiCollection';
import Button from '../../components/button/button';
import ProductsSkelton from '../../components/skeleton/productsSkeleton';
import Header from '../../components/header';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../redux/Reducers/cart.redux';
import RenderHTML from 'react-native-render-html';

const Products = () => {
  let navigation = useNavigation();
  let dispatch = useDispatch()
  const cartItems = useSelector(state => state?.cart?.cartList)
  const [selectedItems, setSelectedItems] = useState({}); // State to track selected items
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleProducts();
  }, []);

  const handleProducts = async () => {
    await callAxiosGet(`${API_CONSTANTS.product}?type=product`).then((res) => {
      let data = res.data;
      setProducts(data);
    });
  };

  const handleNavigation = (item) => {
   
    navigation.navigate("ViewProducts", item);
  };
  const { height, width } = Dimensions.get("window");
  const handleSelected = (itemId) => {
    // Toggle selection state for each item
    setSelectedItems(prevSelected => ({
      ...prevSelected,
      [itemId]: !prevSelected[itemId]
    }));
  };
  const handleCart = (item) => {

    const isGiftItemInCart = cartItems.some(cartItem => cartItem.type === "gift");

    if (isGiftItemInCart) {
      // Alert the user if trying to add any item when a gift item is in the cart
      Alert.alert("Notice", "You cannot add other items when a gift item is already in the cart.");
      return; // Exit function without adding the item
    }
    
    // If no gift item is in the cart, add the item as usual
    const itemQuantity = 1;
    const itemWithQuantity = {
      ...item,
      quantity: itemQuantity
    };
    dispatch(addCart(itemWithQuantity));
    navigation.navigate("Cart");
  };

  return (
    <>
      <Header
        title="Products"
        fIcon="magnifying-glass"
        pIcon="cart"
        cPress={() => navigation.navigate('Cart')}
        left={20}
        handleSerch={() => navigation.navigate('Search')}
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

                      </TouchableOpacity>

                      <View style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, top: 5, paddingHorizontal: 10, paddingVertical: 10, }}>
                        <Text style={{ width: 100, textAlign: 'left', color: COLORS.secondry, fontSize: 14, fontWeight: '500' }}>{item.name.slice(0, 10)}</Text>

                        <Text style={{ fontSize: 20, color: COLORS.title, fontWeight: '500' }}>{'\u20B9'}{item.price} </Text>
                        <RenderHTML
                          contentWidth={width}
                          source={{ html: item.description.slice(0, 25) }}
                        />
                        {/* {item.available_stock <= 0 ? <Text style={{ color: 'black' }}>Out of Stock</Text> : ""} */}

                        {/* <Text style={{ fontSize: 12, color: COLORS.title, fontWeight: '500' }}>{item.description.slice(0, 25)}</Text> */}
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>


                          <TouchableOpacity
                            onPress={() => handleNavigation(item)}
                            style={{ backgroundColor: COLORS.primary, height: 30, borderRadius: 100, marginTop: 10, width: '50%', justifyContent: 'center', alignItems: 'center', right: 3 }}>
                            <Icon source='eye' size={18} color={COLORS.white} />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleCart(item)}
                            style={{ borderColor: COLORS.primary, borderWidth: 1, borderRadius: 100, marginTop: 10, height: 30, width: '50%', justifyContent: 'center', alignItems: 'center' }}>

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
