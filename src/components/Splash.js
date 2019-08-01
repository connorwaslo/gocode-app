import React from 'react';
import { View, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import {verticalScale} from "react-native-size-matters";

// TODO: Add animation to logo
export default class Splash extends React.Component {
    render() {
        return (
            <Animated.Image style={[styles.logo, {top: this.props.top}]}
                            source={require('../res/logo/GoCode_white.png')}
                            resizeMode='contain'/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        flex: 1,
        width: Dimensions.get('window').width * 4 / 5,
        marginVertical: verticalScale(60)
    },
});