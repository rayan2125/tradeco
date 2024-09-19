import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');

export const COLORS = {
    primary: '#72C26A',
    secondry:'#625D57',
    title: '#072F4A',
    white: '#FFFFFF',
    lightGrey: 'rgb(242,242,242)',
    grey: '#C1C0C9',
    blue: '#087BB6',
    yellow: '#F4D03F',

};

export const SIZES = {
    h1: 22,
    h2: 20,
    h3: 18,
    h4: 16,
    h5: 14,
    h6: 12,

    width,
    height,
}