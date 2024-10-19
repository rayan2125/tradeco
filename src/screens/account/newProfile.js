import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Header from '../../components/header';
import Button from '../../components/button/button';
import { Icon, TextInput } from 'react-native-paper';
import { FlatList } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { callAxios } from '../../services/api';
import { API_CONSTANTS } from '../../constants/ApiCollection';
import RBSheet from 'react-native-raw-bottom-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { AlertNotificationRoot, ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserImg } from '../../redux/Reducers/auth.redux';
import DeleteDailog from '../../components/card/deleteDailog';
import { Modal } from 'react-native';
const NewProfile = () => {
    let dispatch = useDispatch()
    const userImg = useSelector(state => state.auth.userImg);


    let navigation = useNavigation()
    const refRBSheet = useRef();

    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        image: '',
    });
    const [openModal, setModal] = useState(false)

    const [errors, setErrors] = useState({});


    const data = ['name', 'email', 'phone', 'address', 'address2', 'city', 'state', 'zip'];


    const handleClickImage = () => {
        const options = {
            mediaType: 'photo',
            maxHeight: 1000,
            maxWidth: 1000,
            quality: 0.5,
        };
        launchCamera(options, (response) => {
            if (response.assets) {
                const imageUri = response.assets[0].uri;
                dispatch(setUserImg(imageUri));  // Save image URI in Redux
                handleClose();
            }
        });
    };

    const handleImagePicker = () => {
        const options = {
            mediaType: 'photo',
            maxHeight: 1000,
            maxWidth: 1000,
            quality: 0.5,
        };
        launchImageLibrary(options, (response) => {
            if (response.assets) {
                const imageUri = response.assets[0].uri;
                dispatch(setUserImg(imageUri));
                handleClose();
            }
        });
    };

    const handleClose = () => {
        refRBSheet.current.close()
    }
    const handleOpen = () => {
        refRBSheet.current.open()
    }

    const validate = () => {
        let tempErrors = {};
        if (!state.name.trim()) tempErrors.name = "Name is required";
        if (!state.email.trim()) tempErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(state.email)) tempErrors.email = "Email format is invalid";
        if (!state.phone.trim()) tempErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(state.phone)) tempErrors.phone = "Phone number must be 10 digits";
        if (!state.address.trim()) tempErrors.address = "Addresss is required";



        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };


    const handleSubmit = async () => {
        if (validate()) {
            await callAxios(API_CONSTANTS.profile, state).then((res) => {
                if (res.success === true) {

                    // Dialog.show({
                    //     type: ALERT_TYPE.SUCCESS,
                    //     title: 'Login Successful',
                    //     textBody: `Welcome, ${phone}`,
                    //     button: 'close',
                    //     onPressButton: () => {
                    //         Dialog.hide();  // Hide the dialog manually
                    //         let token = res.data.token;
                    //         AsyncStorage.setItem('token', token);
                    //         navigation.navigate("Home");  // Navigate after hiding the dialog
                    //     }
                    // });
                    let userInfo = state
                    dispatch(setUser(userInfo))
                    navigation.navigate('Payment')
                }
            })

        } else {
            console.log("Validation failed");
        }
    };
    const handleDeleteImage = () => {
        dispatch(setUserImg(null));  // Clear image
        setModal(false); // Close modal
    };

    return (
        <>
            <AlertNotificationRoot>


                <Text style={{ fontSize: SIZES.h1, color: COLORS.title, fontWeight: '700', textAlign: 'center', marginTop: 10 }}>Profile</Text>

                <View style={{ flex: 1, margin: 20 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            userImg ? (
                                <View style={{ alignSelf: 'center', marginBottom: 10 }}>
                                    <View style={{ height: 110, width: 110, borderColor: COLORS.secondry, borderWidth: 3, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={{ uri: userImg }} style={{ height: 100, width: 100, resizeMode: 'cover', borderRadius: 100 }} />
                                        <TouchableOpacity
                                            onPress={() => setModal(!openModal)}
                                            style={{
                                                position: 'absolute',
                                                bottom: 5,
                                                right: 5,
                                                backgroundColor: 'red',
                                                borderRadius: 100,
                                                height: 20,
                                                width: 20,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Icon source="delete" color='white' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={handleOpen}
                                    style={{
                                        alignSelf: 'center',
                                        height: 100,
                                        width: 100,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'grey',
                                        borderRadius: 100,
                                    }}>
                                    <Text>img</Text>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            bottom: 5,
                                            right: 5,
                                            backgroundColor: 'white',
                                            borderRadius: 100,
                                            height: 20,
                                            width: 20,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Icon source="pen" />
                                    </View>
                                </TouchableOpacity>
                            )
                        }



                        <Modal
                            visible={openModal}
                            transparent={true}
                            onRequestClose={() => setModal(false)}
                        >
                            {openModal && (
                                <DeleteDailog
                                    onDelete={handleDeleteImage}  // Pass function to delete image
                                    onClose={() => setModal(false)} // Close modal when "X" clicked
                                />
                            )}
                        </Modal>
                        {/* Render inputs and handle validation */}
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item} // Use the item (field name) as key
                            renderItem={({ item }) => (
                                <>
                                    <TextInput
                                        mode="outlined"
                                        label={item.charAt(0).toUpperCase() + item.slice(1)} // Capitalize first letter
                                        value={state[item]} // Access the state dynamically
                                        onChangeText={(text) => setState({ ...state, [item]: text })}
                                        style={{ marginBottom: 5 }}
                                        error={errors[item] ? true : false}
                                        activeOutlineColor={COLORS.secondry}
                                        placeholderTextColor={COLORS.secondry}
                                    />
                                    {errors[item] && <Text style={styles.errorText}>{errors[item]}</Text>}
                                </>
                            )}
                        />

                        {/* Submit button */}
                        <Button title="Submit" onPress={handleSubmit} />
                       
                    </ScrollView>
                </View>
                <RBSheet
                    height={130}
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent"
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        }
                    }}
                >
                    <TouchableOpacity
                        onPress={handleClose}
                        style={{ position: 'absolute', right: 10, top: 10 }}>
                        <Icon source='delete' size={20} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", alignItems: 'center', margin: 5 }}>
                        <TouchableOpacity
                            onPress={handleClickImage}
                            style={{ paddingVertical: 10, paddingHorizontal: 20, borderStyle: "dashed", borderRadius: 100, alignItems: "center" }}>

                            <Icon source='camera' size={30} color={COLORS.secondry} />
                            <Text style={{ color: COLORS.title, fontSize: 14, fontWeight: '500' }}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleImagePicker}
                            style={{ paddingVertical: 20, paddingHorizontal: 20, borderStyle: "dashed", borderRadius: 100, alignItems: "center" }}>

                            <Icon source='image' size={30} color={COLORS.secondry} />
                            <Text style={{ color: COLORS.title, fontSize: 14, fontWeight: '500' }}>Image</Text>
                        </TouchableOpacity>

                    </View>
                </RBSheet>
            </AlertNotificationRoot>

        </>
    );
};

export default NewProfile;

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
});
