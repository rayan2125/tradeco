import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'Auth',
    initialState: {
        isLoggedIn: false,
        authData: null,
        adduser: {}, // 
        userImg: null, // Initially set userImg to null
        userProfile: {},
        coin:null
    },
    reducers: {
        setAuthdata(state, action) {
            state.isLoggedIn = true;
            state.authData = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.authData = null;
            state.adduser = {};
            state.userImg = null; // Reset image on logout
        },
        setUser(state, action) {
            state.adduser = action.payload; // Store user data as an object
        },
        setUserImg(state, action) {
            state.userImg = action.payload; // Store the user image
        },
        setProfile(state, action) {
            state.userProfile = action.payload;
        },
        setCoin(state, action) {
            state.coin = action.payload
        }
    },
});

export const { setAuthdata, logout, setUser, setUserImg, setProfile, setCoin } = authSlice.actions;

export default authSlice.reducer;
