import React from 'react';
import { Animated, View, Text, Dimensions, StyleSheet } from "react-native";
import textStyles from "../../../styles/Text";
import {scale, verticalScale} from "react-native-size-matters";

export let SuccessBanner = (props) => (
    <Animated.View style={[styles.bannerContainer, { position: 'absolute', bottom: Dimensions.get('window').height / 7, left: props.right }]}>
        <Text style={textStyles.subsectionTitle}>Good job!</Text>
    </Animated.View>
);

const styles = StyleSheet.create({
    bannerContainer: {
        width: scale(250),
        height: verticalScale(40),
        backgroundColor: '#7AC70C'
    }
});