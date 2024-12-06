import React, { useRef, useState } from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import { COLORS } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { API_CONSTANTS } from '../../constants/ApiCollection';
import { callAxiosGet } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth } = Dimensions.get('window');

const GifScreens = () => {
    const carouselRef = useRef(null);
    let navigation = useNavigation()
    const [activeIndex, setActiveIndex] = useState(0);

    const gifs = [
        { id: 1, title: 'Join TradeCo and Start Earning', des: 'Once you join Tradeco, you can start your business and earning by making a small investment.you also get opportunities to add associate members and start your earning.', img: require('../../assets/teamwork.gif') },
        { id: 2, title: 'Get Exciting Rewards & Gifts', des: 'We provide exclusive rewards and referral points to our members who help us GROW. Tradeco provides gifts and rewards to its associates based on its rules.', img: require('../../assets/gift.gif') },
        { id: 3, title: 'Start Earning Income', des: 'Tradeco has provisions which gives you opportunities to get earnings on products sold by your associates.', img: require('../../assets/profit.gif') }
    ];
    const handleSubmit = async () => {
        if (activeIndex === 2) {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                await callAxiosGet(API_CONSTANTS.profile).then((res) => {
                    let userDetails = res.data;
                    if (userDetails.status === 'pending') {
                        navigation.navigate('NewProfile');
                    } else {
                        navigation.replace('Home');
                    }
                });
            } else {
                // If no token, navigate to Login screen
                navigation.replace('Login');
            }
        } else {
            carouselRef.current?.snapToNext()
        }

    }
    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <FastImage
                source={item.img}
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={{ fontSize: 24, color: COLORS.title, fontWeight: '800', marginTop: 10 }}>{item.title}</Text>
            <Text style={{ fontSize: 16, color: COLORS.title, marginTop: 20 }}>{item.des}</Text>
        </View>
    );

    return (
        <View style={styles.container}>

            <Carousel
                ref={carouselRef}
                data={gifs}
                renderItem={renderItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth * 0.9}
                loop={false}
                autoplay={false}

                onSnapToItem={(index) => setActiveIndex(index)} // Update active index on slide change
            />
            <Pagination
                dotsLength={gifs.length}
                activeDotIndex={activeIndex}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.activeDot}
                inactiveDotStyle={styles.inactiveDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        activeIndex === 0 && styles.disabledButton // Disable style if on the first item
                        , { borderBottomRightRadius: 20, borderTopRightRadius: 20 }]}
                    onPress={() => carouselRef.current?.snapToPrev()}
                    disabled={activeIndex === 0} // Disable button if on the first item
                >
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.button,
                        // Disable style if on the last item
                        , { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }]}
                    onPress={() => handleSubmit()}
                // Disable button if on the last item
                >
                    <Text style={styles.buttonText}> {activeIndex === 2 ? 'Finish' : 'Next'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GifScreens;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        borderRadius: 8,
        padding: 10,
        marginTop: 50,
        // left: 30
    },
    image: {
        width: '100%',
        height: 300,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 10,
        paddingHorizontal: 10,
        // marginHorizontal: 10,
        // borderRadius: 5,
        marginBottom: 20,
        width: 100
        // boderr
    },
    paginationContainer: {
        paddingVertical: 10,
    },
    activeDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: COLORS.primary,
    },
    inactiveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#cccccc',
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
