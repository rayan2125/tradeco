import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import FIcon from 'react-native-vector-icons/FontAwesome6';
import MIcon from 'react-native-vector-icons/MaterialIcons'; // Use MaterialIcons for 'chevron-left'
import { callAxiosGet } from '../../services/api';
import { API_CONSTANTS } from '../../constants/ApiCollection';
import { COLORS } from '../../constants/theme';

const Search = () => {
    let navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [searchingData, setSearchingData] = useState([])
   
    const handleSearch = async (text) => {
        setSearch(text)

        await callAxiosGet(`${API_CONSTANTS.product}?search=${text}`).then(
            (res) => {

                let filter = res?.data
                setSearchingData(filter)
            }
        )

    };
    const handleFoodView = (item) => {
        if (search !== "") {
            navigation.navigate("ViewProducts", item);
        }
    }
    const handleRemove = () => {
        setSearch('')
        setSearchingData([])
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    style={{ backgroundColor: COLORS.primary, height: 45, width: 45, borderRadius: 100, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                    <MIcon name="chevron-left" size={25} color={COLORS.white} />
                </TouchableOpacity>

                <View style={{ width: '75%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderColor: COLORS.primary, borderWidth: 1, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, alignItems: 'center' }}>
                        <TextInput
                            style={{ width: '80%' }}
                            placeholder="Search food..."
                            value={search}
                            onChangeText={(text) => handleSearch(text)}
                        // onSubmitEditing={(text)=>handleSearch(text)}
                        />
                        {search.length > 0 && (
                            <TouchableOpacity
                                onPress={handleRemove}
                                style={{
                                    backgroundColor: '#727272',
                                    height: 20,
                                    width: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 100
                                }}>
                                <FIcon name="x" color={COLORS.white} size={10} />
                            </TouchableOpacity>
                        )}

                    </View>
                </View>

            </View>
            {
                searchingData && searchingData.length > 0 && (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={searchingData}
                        renderItem={({ item, index }) => {

                            return (
                                <View style={{ margin: 20 }}>
                                    <TouchableOpacity onPress={() => handleFoodView(item)}>
                                        <Text style={{ color: COLORS.textColor, fontWeight: '500' }}>{item.name}</Text>
                                    </TouchableOpacity>

                                </View>
                            )
                        }} />
                )
            }
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({});
