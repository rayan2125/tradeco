import React, { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { Icon, TextInput } from 'react-native-paper';
import Header from '../../components/header';
import Button from '../../components/button/button';
import { COLORS } from '../../constants/theme';
import { callAxios } from '../../services/api';
import { API_CONSTANTS } from '../../constants/ApiCollection';
import RBSheet from 'react-native-raw-bottom-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserImg } from '../../redux/Reducers/auth.redux';
import DeleteDailog from '../../components/card/deleteDailog';
import { AlertNotificationRoot } from 'react-native-alert-notification';

const Profile = () => {
    const dispatch = useDispatch();
    const userImg = useSelector(state => state.auth.userImg);
  
    const userDetails = useSelector(state => state.auth.adduser);

    let id = userDetails.id
    const navigation = useNavigation();
    const refRBSheet = useRef();
    const [openModal, setModal] = useState(false);


    const [state, setState] = useState({
        id,
        name: userDetails.name || '',
        email: userDetails.email || '',
        phone: userDetails.phone || '',
        address: userDetails.address || '',
        address2: userDetails.address2 || '',
        city: userDetails.city || '',
        state: userDetails.state || '',
        zip: userDetails.zip || '',
        image: userImg || '',
    });

    const [errors, setErrors] = useState({});

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
                dispatch(setUserImg(imageUri));
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
        refRBSheet.current.close();
    };

    const handleOpen = () => {
        refRBSheet.current.open();
        setModal(false);
    };

    const validate = () => {
        let tempErrors = {};
        if (!state.name.trim()) tempErrors.name = "Name is required";
        if (!state.email.trim()) tempErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(state.email)) tempErrors.email = "Email format is invalid";

        else if (!/^\d{10}$/.test(state.phone)) tempErrors.phone = "Phone number must be 10 digits";
        if (!state.address.trim()) tempErrors.address = "Address is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validate()) {
            const formData = new FormData();
            formData.append('id', state.id);
            formData.append('name', state.name);
            formData.append('email', state.email);
            formData.append('phone', state.phone);
            formData.append('address', state.address);
            formData.append('address2', state.address2);
            formData.append('city', state.city);
            formData.append('state', state.state);
            formData.append('zip', state.zip);
            
            if (state.image) {
                formData.append('image', {
                    uri: state.image,
                    type: 'image/jpeg', // or the actual MIME type of the image
                    name: 'profile.jpg', // or the actual name of the file
                });
            }
    
            try {
                const res = await callAxios(API_CONSTANTS.profile, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(res.data);
                if (res.success) {
                    // dispatch(setUser(state)); // Uncomment if needed
                    navigation.navigate('Account');
                }
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        } else {
            console.log("Validation failed");
        }
    };
    
    const handleDeleteImage = () => {
        dispatch(setUserImg(null));
        setModal(false);
    };

    return (
        <>
            <Header title="Profile" />
            <AlertNotificationRoot>
                <View style={{ flex: 1, margin: 20 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {userImg ? (
                            <View style={{ alignSelf: 'center', marginBottom: 10 }}>
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: userImg }} style={styles.userImage} />
                                    <TouchableOpacity
                                        onPress={() => setModal(!openModal)}
                                        style={styles.deleteIcon}>
                                        <Icon source="delete" color='white' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <TouchableOpacity onPress={handleOpen} style={styles.imagePlaceholder}>
                                <Text>img</Text>
                                <View style={styles.editIcon}>
                                    <Icon source="pen" />
                                </View>
                            </TouchableOpacity>
                        )}

                        <Modal visible={openModal} transparent onRequestClose={() => setModal(false)}>
                            {openModal && (
                                <DeleteDailog
                                    onDelete={handleDeleteImage}
                                    onClose={() => setModal(false)}
                                    onedit={handleOpen}
                                />
                            )}
                        </Modal>

                        <TextInput
                            mode="outlined"
                            label="Name"
                            value={state.name}
                            onChangeText={(text) => setState({ ...state, name: text })}
                            style={{ marginBottom: 5 }}
                            error={!!errors.name}
                            activeOutlineColor={COLORS.secondry}
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                        <TextInput
                            mode="outlined"
                            label="Email"
                            value={state.email}
                            onChangeText={(text) => setState({ ...state, email: text })}
                            style={{ marginBottom: 5 }}
                            error={!!errors.email}
                            activeOutlineColor={COLORS.secondry}
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        <TextInput
                            mode="outlined"
                            label="Phone"
                            value={state.phone.toString()}
                            onChangeText={(text) => setState({ ...state, phone: text })}
                            style={{ marginBottom: 5 }}
                            keyboardType="phone-pad"
                            error={!!errors.phone}
                            activeOutlineColor={COLORS.secondry}
                            maxLength={10}
                        />
                        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

                        <TextInput
                            mode="outlined"
                            label="Address"
                            value={state.address}
                            onChangeText={(text) => setState({ ...state, address: text })}
                            style={{ marginBottom: 5 }}
                            error={!!errors.address}
                            activeOutlineColor={COLORS.secondry}
                        />
                        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

                        <TextInput
                            mode="outlined"
                            label="Address 2"
                            value={state.address2}
                            onChangeText={(text) => setState({ ...state, address2: text })}
                            style={{ marginBottom: 5 }}
                            activeOutlineColor={COLORS.secondry}
                        />

                        <TextInput
                            mode="outlined"
                            label="City"
                            value={state.city}
                            onChangeText={(text) => setState({ ...state, city: text })}
                            style={{ marginBottom: 5 }}
                            activeOutlineColor={COLORS.secondry}
                        />

                        <TextInput
                            mode="outlined"
                            label="State"
                            value={state.state}
                            onChangeText={(text) => setState({ ...state, state: text })}
                            style={{ marginBottom: 5 }}
                            activeOutlineColor={COLORS.secondry}
                        />

                        <TextInput
                            mode="outlined"
                            label="Zip"
                            value={state.zip.toString()}
                            onChangeText={(text) => setState({ ...state, zip: text })}
                            style={{ marginBottom: 5 }}
                            keyboardType="numeric"
                            maxLength={6}
                            activeOutlineColor={COLORS.secondry}
                        />

                        <Button title="Update" onPress={handleSubmit} />
                    </ScrollView>
                </View>

                <RBSheet
                    height={130}
                    ref={refRBSheet}
                    closeOnDragDown
                    closeOnPressMask={false}
                    customStyles={{
                        wrapper: { backgroundColor: "transparent" },
                        draggableIcon: { backgroundColor: "#000" },
                    }}>
                    <TouchableOpacity onPress={handleClose} style={styles.sheetCloseButton}>
                        <Icon source='delete' size={20} />
                    </TouchableOpacity>
                    <View style={styles.imageOptions}>
                        <TouchableOpacity onPress={handleClickImage} style={styles.cameraOption}>
                            <Icon source='camera' size={30} color={COLORS.secondry} />
                            <Text style={styles.optionText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleImagePicker} style={styles.imageOption}>
                            <Icon source='image' size={30} color={COLORS.secondry} />
                            <Text style={styles.optionText}>Image</Text>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
            </AlertNotificationRoot>
        </>
    );
};

const styles = StyleSheet.create({
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        borderWidth: 1,
        borderColor: 'grey',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        alignSelf: 'center'
    },
    deleteIcon: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        backgroundColor: 'red',
        borderRadius: 100 / 2,
        padding: 5,
    },
    imageContainer: {
        position: 'relative',
        alignSelf: 'center',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 100 / 2,
        padding: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 5,
    },
    sheetCloseButton: {
        alignSelf: 'flex-end',
        margin: 10,
    },
    imageOptions: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginHorizontal: 20,
        alignItems: 'center',
        bottom: 10

    },
    cameraOption: {
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 10,
        height: 80, width: 80,
        borderRadius: 100,
        justifyContent: 'center',
        marginHorizontal: 20,
        borderRightColor: COLORS.secondry,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1
    },
    imageOption: {
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 10,
        height: 80, width: 80,
        borderRadius: 100,
        justifyContent: 'center',
        borderRightColor: COLORS.secondry,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1
    },
    optionText: {
        color: COLORS.secondry,
        marginTop: 5,
    },
});

export default Profile;
